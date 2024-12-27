import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {symbols} from '../../../../../common/components/symbols/symbols';
import {toLocalDate} from '../../../../../common/extensions/Date';
import {routeCreator} from '../../../bubble-click.routes';
import {RouterLink} from '@angular/router';
import {BankService} from '../../../domains/bank/services/bank/bank.service';
import {TwaService} from '../../../../../common/services/twa.service';
import {DepositService} from '../../../domains/bank/services/deposit/deposit.service';
import {Subscription} from 'rxjs';
import {Deposit, depositToDate} from '../../../domains/bank/interfaces/deposit.interface';
import {Localisation} from '../../../../../common/services/localisation';

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
            <span class="my-auto mx-0">{{localisation.messages.InBank ?? 'In bank'}}</span>
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
                <div class="m-auto">{{ localisation.messages.Replenish ?? 'Replenish' }}</div>
              </a>
            </div>
            <div class="col">
              <a class="vstack jcc" [routerLink]="routeCreator.withdraw()">
                <div class="m-auto">
                  <svg class="bi" style="width: 2rem; height: 2rem">
                    <use [attr.xlink:href]="'#' + symbols.arrowDown"/>
                  </svg>
                </div>
                <div class="m-auto">{{ localisation.messages.Withdraw ?? 'Withdraw' }}</div>
              </a>
            </div>
          </div>
        </article>
        <hr>
        <article class="deposit">
          <h5 class="h5 color-subtitle jcb">
            <span class="my-auto mx-0">{{ localisation.messages.OnDeposit ?? 'On deposit' }}</span>
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
                {{ localisation.messages.NearestBonus ?? 'The nearest bonus' }} {{ toLocalDate(depositToDate(nearestDeposit), twa.getUserLanguageCode() ?? 'en') }}
              </div>
            }
          </div>
          <div class="jcc">
            <a class="btn btn-lg tg-btn w-100" [routerLink]="routeCreator.deposit()">{{ localisation.messages.Deposits ?? 'Deposits' }}</a>
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
    protected bankService: BankService,
    protected depositService: DepositService,
    protected twa: TwaService,
    protected localisation: Localisation,
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
      title: this.localisation.messages.PopupBankInfoTitle ?? 'Why do you need a Bank?', // 64
      message: this.localisation.messages.PopupBankInfoContent ?? 'Keep your coins in the bank! Protect yourself from unexpected expenses!', // 256
      buttons: [ // 1-3 items
        {type: 'ok'},
      ]
    })
  }

  depositInfo() {
    this.twa.showPopup({
      title: this.localisation.messages.PopupDepositInfoTitle ?? 'Why do you need a Deposit?', // 64
      message: this.localisation.messages.PopupDepositInfoContent ?? 'Deposit coins and get more profit at the end of the term!', // 256
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
