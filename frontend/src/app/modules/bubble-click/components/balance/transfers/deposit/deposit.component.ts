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
import {routeCreator} from '../../../../bubble-click.routes';
import {CoinsService} from '../../../../domains/coins/services/coins/coins.service';
import {Localisation} from '../../../../../../common/services/localisation';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="accent-border accent-border-top accent-bg-shadow rounded-5 tg-bg-secondary">
      <div class="hstack p-3 pb-0 color-accent">
        <span class="m-auto text-center h5">{{ localisation.messages.Deposits ?? 'Deposits' }}</span>
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
                        <div>{{ localisation.messages.Contribution ?? 'Contribution' }} {{ deposit.sum }}</div>
                        <div>{{ localisation.messages.upTo ?? 'up to' }} {{ toLocalDate(depositToDate(deposit), twa.getUserLanguageCode() ?? 'en') }}</div>
                      </div>
                      <div class="vstack my-auto">
                        <div>{{ localisation.messages.income ?? 'income' }}</div>
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
                        {{ localisation.messages.WithdrawDeposit ?? 'Withdraw deposit' }}
                        @if (canTake) {
                          <span class="color-accent">+{{ localisation.messages.bonus ?? 'bonus' }} {{ depositToBonus(deposit) }}</span>
                        }
                      </div>
                      <button class="btn" [ngClass]="{
                      'btn-success': canTake,
                      'btn-secondary': !canTake,
                      }" (click)="take(index)">
                        {{ localisation.messages.Take ?? 'Take' }}
                      </button>
                    </div>
                  </li>
                }
              </ul>
            } @else {
              <p>{{ localisation.messages.NoDepositsYet ?? 'No deposits yet.' }}</p>
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
    protected localisation: Localisation,
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
      this.twa.showAlert(this.localisation.messages.AlertCantFindDeposit ?? `'Can't find deposit'`)
      return
    }

    let message = `${this.localisation.messages.WithdrawDeposit ?? 'Withdraw deposit'} ${deposit.sum}`

    if (this._canTake(deposit)) {
      message += ` +${this.localisation.messages.bonus ?? 'bonus'} ${depositToBonus(deposit)}`
    }

    const yes = 'yes'
    this.twa.showPopup({
      title: this.localisation.messages.WithdrawDeposit ?? 'Withdraw deposit',
      message: `${message}?`, // 256
      buttons: [
        {id: yes, type: 'ok'},
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
    this.twa.setMainButton({text: this.localisation.messages.AddDeposit ?? 'Add deposit', is_active: true, is_visible: true}, this.add)
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
