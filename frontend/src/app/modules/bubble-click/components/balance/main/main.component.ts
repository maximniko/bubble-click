import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {symbols} from '../../../../../common/components/symbols/symbols';
import {toLocalDate} from '../../../../../common/extensions/Date';
import {routeCreator} from '../../../bubble-click.routes';
import {RouterLink} from '@angular/router';
import {CoinsService} from '../../../domains/coins/services/coins/coins.service';
import {BankService} from '../../../domains/bank/services/bank/bank.service';
import {TwaService} from '../../../../../common/services/twa.service';
import {DepositService} from '../../../domains/bank/services/deposit/deposit.service';
import {Subscription} from 'rxjs';
import {Deposit, depositToDate} from '../../../domains/bank/interfaces/deposit.interface';

@Component({
  selector: 'balance-main',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styles: `
    .dropdown-toggle::after {
      content: none;
    }`,
  template: `
    <div class="m-2">
      <section class="tg-bg-secondary p-2 rounded-2">
        <article class="in-bank mb-3">
          <h5 class="h5 color-subtitle jcb">
            <span class="my-auto mx-0">В банке</span>
            <span class="p-2" (click)="bankInfo()">
              <svg class="bi">
                <use [attr.xlink:href]="'#' + symbols.infoCircle"/>
              </svg>
            </span>
          </h5>
          <div class="input-group input-group-lg mb-3">
            <span class="input-group-text">
              <svg class="bi">
                <use [attr.xlink:href]="'#' + symbols.coin"/>
              </svg>
            </span>
            <input class="form-control" type="text" value="{{ bankService.balanceSubject | async }}" aria-label="В банке" disabled readonly>
          </div>
          <div class="row row-cols-2">
            <div class="col">
              <a class="vstack jcc" [routerLink]="routeCreator.transfer()">
                <div class="m-auto">
                  <svg class="bi" style="width: 2rem; height: 2rem">
                    <use [attr.xlink:href]="'#' + symbols.arrowUp"/>
                  </svg>
                </div>
                <div class="m-auto">Пополнить</div>
              </a>
            </div>
            <div class="col">
              <a class="vstack jcc" [routerLink]="routeCreator.withdraw()">
                <div class="m-auto">
                  <svg class="bi" style="width: 2rem; height: 2rem">
                    <use [attr.xlink:href]="'#' + symbols.arrowDown"/>
                  </svg>
                </div>
                <div class="m-auto">Вывести</div>
              </a>
            </div>
          </div>
        </article>
        <hr>
        <article class="deposit">
          <h5 class="h5 color-subtitle jcb">
            <span class="my-auto mx-0">На депозите</span>
            <span class="p-2" (click)="depositInfo()">
              <svg class="bi">
                <use [attr.xlink:href]="'#' + symbols.infoCircle"/>
              </svg>
            </span>
          </h5>
          <div class="input-group input-group-lg mb-3">
            <span class="input-group-text">
              <svg class="bi">
                <use [attr.xlink:href]="'#' + symbols.clockHistory"/>
              </svg>
            </span>
            <input class="form-control" type="text" value="{{ depositSum }}" aria-label="Баланс депозитов" disabled readonly>
            @if (nearestDeposit) {
              <div class="valid-feedback d-block color-accent">
                Ближайший бонус {{ toLocalDate(depositToDate(nearestDeposit), twa.getUserLanguageCode() ?? 'en') }}
              </div>
            }
          </div>
          <div class="jcc">
            <a class="btn btn-lg tg-btn w-100" [routerLink]="routeCreator.deposit()">Депозиты</a>
          </div>
        </article>
      </section>
    </div>
  `,
})
export class MainComponent implements OnInit, OnDestroy {
  private depositSubscription?: Subscription
  protected depositSum: number = 0
  protected nearestDeposit?: Deposit

  constructor(
    protected coinsService: CoinsService,
    protected bankService: BankService,
    protected depositService: DepositService,
    protected twa: TwaService,
  ) {
  }

  ngOnInit() {
    this.depositSubscription = this.depositService.depositsSubject
      .subscribe((items: Deposit[]) => {
        this.depositSum = items.reduce<number>((acc: number, item: Deposit) => {
          acc += item.sum
          return acc
        }, 0)
        const now = Date.now()
        items.forEach((item: Deposit) => {
          const itemTime = depositToDate(item).getTime()
          if (itemTime < now) {
            return
          }
          if (
            !this.nearestDeposit
            || depositToDate(this.nearestDeposit).getTime() > itemTime
          ) {
            this.nearestDeposit = item
          }
        })
      })
  }

  ngOnDestroy() {
    this.depositSubscription?.unsubscribe()
  }

  bankInfo() {
    this.twa.showPopup({
      title: 'Зачем нужен Банк?', // 64
      message: 'Храните монеты в банке! Защити себя от непредвиденных расходов!', // 256
      buttons: [ // 1-3 items
        {type: 'ok'},
      ]
    })
  }

  depositInfo() {
    this.twa.showPopup({
      title: 'Зачем нужен Депозит?', // 64
      message: 'Положи монеты на депозит и получи больше прибыли по окончании срока!', // 256
      buttons: [ // 1-3 items
        {type: 'ok'},
      ]
    })
  }

  protected readonly toLocalDate = toLocalDate;
  protected readonly symbols = symbols;
  protected readonly routeCreator = routeCreator;
  protected readonly depositToDate = depositToDate;
}
