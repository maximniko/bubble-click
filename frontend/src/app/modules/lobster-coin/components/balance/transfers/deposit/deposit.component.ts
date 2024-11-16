import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  Deposit,
  depositToBonus,
  depositToCoefficient,
  depositToDate,
} from '../../../../domains/bank/interfaces/deposit.interface';
import {DepositService} from '../../../../domains/bank/services/deposit/deposit.service';
import {toLocalDate} from '../../../../../../common/extensions/Date';
import {TwaService} from '../../../../../../common/services/twa.service';
import {Router} from '@angular/router';
import {routeCreator} from '../../../../lobster-coin.routes';
import {CoinsService} from '../../../../domains/coins/services/coins.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="accent-border accent-border-top accent-bg-shadow rounded-5 tg-bg-secondary">
      <div class="hstack p-3 pb-0 color-accent">
        <span class="m-auto text-center h5">Депозиты</span>
      </div>

      <div class="mb-5">
        <div class="mx-2 my-4 overflow-auto" style="max-height: calc(var(--tg-viewport-stable-height, 200) * 0.7)">
          @if (depositService.depositsSubject | async; as deposits) {
            @if (deposits.length) {
              <ul class="list-group">
                @for (deposit of deposits; track deposit; let index = $index) {
                  <li class="list-group-item align-items-center">
                    @let coefficient = _coefficient(deposit) ;
                    @let canTake = _canTake(deposit) ;
                    <div class="d-flex justify-content-around my-2 text-center">
                      <div class="vstack my-auto">
                        <div>Вклад {{ deposit.sum }}</div>
                        <div>до {{ toLocalDate(depositToDate(deposit), twa.getUserLanguageCode() ?? 'en') }}</div>
                      </div>
                      <div class="vstack my-auto">
                        <div>доход</div>
                        <div class="h2">{{ deposit.plan.percents }}%</div>
                      </div>
                    </div>
                    <div class="progress" role="progressbar">
                      <div class="progress-bar progress-bar-striped progress-bar-animated" [ngClass]="{
                    'bg-success': canTake,
                    'bg-secondary': !canTake,
                    }" style="width:{{ Math.ceil(coefficient * 100) }}%">{{ coefficient | percent }}
                      </div>
                    </div>
                    <div class="d-flex justify-content-between my-2">
                      <div class="m-auto">
                        Забрать вклад
                        @if (canTake) {
                          <span class="color-accent">+бонус {{ depositToBonus(deposit) }}</span>
                        }
                      </div>
                      <button class="btn" [ngClass]="{
                      'btn-success': canTake,
                      'btn-secondary': !canTake,
                      }" (click)="take(index)">
                        Забрать
                      </button>
                    </div>
                  </li>
                }
              </ul>
            } @else {
              <p>Пока нет депозитов.</p>
            }
          }
        </div>
      </div>
    </section>
  `,
  host: {class: 'd-flex flex-column h-100'},
})
export class DepositComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private coinsService: CoinsService,
    protected depositService: DepositService,
    protected twa: TwaService,
  ) {
    this.add = this.add.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  protected _coefficient(deposit: Deposit): number {
    return depositToCoefficient(deposit)
  }

  protected _canTake(deposit: Deposit): boolean {
    return depositToCoefficient(deposit) * 100 >= 100
  }

  take(index: number) {
    const deposit = this.depositService.deposits[index]

    if (!deposit) {
      this.twa.showAlert(`Can't find deposit`)
      return
    }

    let message = `Забрать вклад ${deposit.sum}`

    if (this._canTake(deposit)) {
      message += ` +бонус ${depositToBonus(deposit)}`
    }

    const yes = 'yes'
    this.twa.showPopup({
      title: 'Забрать вклад',
      message: `${message}?`, // 256
      buttons: [
        {id: yes, type: 'default', text: 'Да'},
        {type: 'cancel'},
      ]
    }, (btn) => {
      if (btn === yes) {
        this.takeDeposit(index)
      }
    })
  }

  private takeDeposit(index: number) {
    const deposits = this.depositService.deposits,
      balance = this.coinsService.balance

    const oldDeposits = Array.from(deposits)
    const deposit = deposits.splice(index, 1)[0]

    let take: number = deposit.sum

    if (this._canTake(deposit)) {
      take += depositToBonus(deposit)
    }

    try {
      this.coinsService.saveBalance(balance + take)
      this.depositService.saveDeposits(deposits)
    } catch {
      this.coinsService.saveBalance(balance)
      this.depositService.saveDeposits(oldDeposits)
    }
  }

  ngOnInit() {
    this.twa.setMainButton({text: 'Добавить депозит', is_active: true, is_visible: true}, this.add)
    this.twa.backButtonOnClick(this.goBack)
  }

  ngOnDestroy() {
    this.twa.offMainButton(this.add)
    this.twa.offBackButton(this.goBack)
  }

  goBack() {
    this.router.navigate([routeCreator.balance()])
  }

  add() {
    this.router.navigate([routeCreator.depositAdd()])
  }

  protected readonly toLocalDate = toLocalDate;
  protected readonly depositToBonus = depositToBonus;
  protected readonly depositToDate = depositToDate;
  protected readonly Math = Math;
}
