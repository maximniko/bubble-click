import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  Deposit,
  depositToBonus,
  depositToCoefficient,
} from '../../../domains/bank/interfaces/deposit.interface';
import {DepositService} from '../../../domains/bank/services/deposit/deposit.service';
import {toLocalDate} from '../../../../../common/extensions/Date';
import {TwaService} from '../../../../../common/services/twa.service';
import {Router} from '@angular/router';
import {routeCreator} from '../../../lobster-coin.routes';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="accent-border accent-border-top accent-bg-shadow card rounded-5 h-100">
      <div class="hstack p-3 pb-0 color-accent">
        <span class="m-auto text-center h5">Deposits</span>
      </div>
      <div class="d-flex flex-column h-100 mb-5">
        <div class="mx-2 my-4">
          @if (depositService.depositsSubject | async; as deposits) {
            @if (deposits.length) {
              <ul class="list-group">
                @for (deposit of deposits; track deposit; let index = $index) {
                  <li class="list-group-item align-items-center">
                    @let coefficient = _coefficient(deposit) ;
                    @let periodPercents = coefficient * 100 ;
                    @let canTake = _canTake(deposit) ;
                    <div class="d-flex justify-content-around my-2 text-center">
                      <div class="vstack my-auto">
                        <div>Вклад {{ deposit.sum }}</div>
                        <div> до {{ toLocalDate(deposit.fromDate, twa.getUserLanguageCode() ?? 'en') }}</div>
                      </div>
                      <div class="vstack my-auto">
                        <div>доход</div>
                        <div class="h2">{{ deposit.plan.percents }}%</div>
                      </div>
                    </div>
                    <div class="progress"
                         role="progressbar"
                         aria-label="Animated striped example"
                         [attr.aria-valuenow]="periodPercents"
                         [attr.aria-valuemin]="0"
                         [attr.aria-valuemax]="100">
                      <div class="progress-bar progress-bar-striped progress-bar-animated" [ngClass]="{
                    'bg-success': canTake,
                    'bg-secondary': !canTake,
                    }" style="width:{{ periodPercents }}%">{{ periodPercents | number: '1.0-2': twa.getUserLanguageCode() ?? 'en' }}%
                      </div>
                    </div>
                    <div class="d-flex justify-content-between my-2">
                      <div class="m-auto" >
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
              <p>No deposits yet.</p>
            }
          }
        </div>
      </div>
    </section>
  `,
})
export class DepositComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    protected depositService: DepositService,
    protected twa: TwaService,
  ) {
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
        {id: yes, type: 'default', text: 'Open ton.org'},
        {type: 'cancel'},
      ]
    }, (btn) => {
      if (btn === yes) {
        // забираем депозит, добавляем себе на счет, обновляем депозиты.
        // При ошибке - возвращаем все обратно
      }
    })
  }

  ngOnInit() {
    this.twa.setMainButton({text: 'Add Deposit', is_active: true, is_visible: true}, () => this.add())
    this.twa.backButtonOnClick(() => this.goBack())
  }

  ngOnDestroy() {
    this.twa.offBackButton(() => this.goBack())
    this.twa.offMainButton(() => this.add())
  }

  goBack() {
    this.router.navigate([routeCreator.balance()])
  }

  add() {
    this.router.navigate([routeCreator.depositAdd()])
  }

  protected readonly toLocalDate = toLocalDate;
  protected readonly depositToBonus = depositToBonus;
}
