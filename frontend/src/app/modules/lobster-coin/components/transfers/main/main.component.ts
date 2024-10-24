import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {symbols} from '../../../../../common/components/symbols/symbols';
import {routeCreator} from '../../../lobster-coin.routes';
import {Router, RouterLink} from '@angular/router';
import {CoinsService} from '../../../domains/coins/services/coins.service';
import {BankService} from '../../../domains/bank/services/bank/bank.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  styles: `
    .dropdown-toggle::after {
      content: none;
    }`,
  template: `
    <div class="mx-2">
      <p class="h1 text-center my-3">{{ ownBalance }} Coins</p>
      <section class="tg-bg-secondary p-2 rounded-2 mb-3">
        <div class="row row-cols-2">
          <div class="col">
            <a class="vstack jcc" [routerLink]="routeCreator.bankTransfer()">
              <div class="m-auto">
                <svg class="bi" style="width: 2rem; height: 2rem">
                  <use [attr.xlink:href]="'#' + symbols.arrowUp"/>
                </svg>
              </div>
              <div class="m-auto">To Bank</div>
            </a>
          </div>
          <div class="col">
            <a class="vstack jcc" [routerLink]="routeCreator.bankWithdraw()">
              <div class="m-auto">
                <svg class="bi" style="width: 2rem; height: 2rem">
                  <use [attr.xlink:href]="'#' + symbols.arrowDown"/>
                </svg>
              </div>
              <div class="m-auto">Withdrawal</div>
            </a>
          </div>
        </div>
      </section>

      <section class="tg-bg-secondary p-2 rounded-2">
        <h5 class="h5 color-subtitle">In Bank:</h5>
        <div class="input-group input-group-lg mb-3">
          <span class="input-group-text">
            <svg class="bi">
              <use [attr.xlink:href]="'#' + symbols.coin"/>
            </svg>
          </span>
          <input class="form-control" type="text" value="{{ bankBalance }}" aria-label="Wallet balance" disabled readonly>
        </div>

        <div class="jcc">
          <a class="btn btn-lg" [routerLink]="routeCreator.bankDeposit()" [ngClass]="{
            'btn-success': bankBalance > 0,
            'btn-warning disabled': bankBalance < 1,
            }">Deposit</a>
        </div>
      </section>
    </div>
  `,
})
export class MainComponent implements OnInit {
  protected bankBalance: number = 0
  protected ownBalance: number = 0

  constructor(
    private coin: CoinsService,
    private bank: BankService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.bankBalance = this.bank.balance
    this.ownBalance = this.coin.balance
  }

  goBack() {
    this.router.navigate([routeCreator.main()])
  }

  protected readonly symbols = symbols;
  protected readonly routeCreator = routeCreator;
}
