import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {symbols} from '../../../../../common/components/symbols/symbols';
import {routeCreator} from '../../../lobster-coin.routes';
import {RouterLink} from '@angular/router';
import {CoinsService} from '../../../domains/coins/services/coins.service';
import {BankService} from '../../../domains/bank/services/bank/bank.service';
import {TwaService} from '../../../../../common/services/twa.service';

@Component({
  selector: 'balance-main',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styles: `
    .dropdown-toggle::after {
      content: none;
    }`,
  template: `
    <div class="mx-2">
      <h1 class="h1 text-center mt-2 mb-0">{{ coinsService.balanceSubject | async }} Coins</h1>
      <section class="tg-bg-secondary p-2 rounded-2">
        <article class="in-bank mb-3">
          <h5 class="h5 color-subtitle jcb">
            <span class="my-auto mx-0">In Bank</span>
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
            <input class="form-control" type="text" value="{{ bankService.balanceSubject | async }}" aria-label="Wallet balance" disabled readonly>
          </div>
          <div class="row row-cols-2">
            <div class="col">
              <a class="vstack jcc" [routerLink]="routeCreator.transfer()">
                <div class="m-auto">
                  <svg class="bi" style="width: 2rem; height: 2rem">
                    <use [attr.xlink:href]="'#' + symbols.arrowUp"/>
                  </svg>
                </div>
                <div class="m-auto">To Bank</div>
              </a>
            </div>
            <div class="col">
              <a class="vstack jcc" [routerLink]="routeCreator.withdraw()">
                <div class="m-auto">
                  <svg class="bi" style="width: 2rem; height: 2rem">
                    <use [attr.xlink:href]="'#' + symbols.arrowDown"/>
                  </svg>
                </div>
                <div class="m-auto">Withdrawal</div>
              </a>
            </div>
          </div>
        </article>
        <hr>
        <article class="deposit">
          <h5 class="h5 color-subtitle jcb">
            <span class="my-auto mx-0">Deposit</span>
            <span class="p-2" (click)="depositInfo()">
              <svg class="bi">
                <use [attr.xlink:href]="'#' + symbols.infoCircle"/>
              </svg>
            </span>
          </h5>
          <div class="jcc">
            <a class="btn btn-lg tg-btn w-100" [routerLink]="routeCreator.deposit()">Check Deposits</a>
          </div>
        </article>
      </section>
    </div>
  `,
})
export class MainComponent {

  constructor(
    protected coinsService: CoinsService,
    protected bankService: BankService,
    protected twa: TwaService,
  ) {
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

  protected readonly symbols = symbols;
  protected readonly routeCreator = routeCreator;
}
