import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {symbols} from '../../../../../common/components/symbols/symbols';
import {routeCreator} from '../../../lobster-coin.routes';
import {Router, RouterLink} from '@angular/router';
import {STORAGE_KEY_BALANCE, TwaService} from '../../../../../common/services/twa.service';
import {CoinsService} from '../../../domains/coins/services/coins.service';

@Component({
  standalone: true,
  imports: [CommonModule, NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, RouterLink],
  styles: `
    .dropdown-toggle::after {
      content: none;
    }`,
  template: `
    @if(ownBalance > 0) {
      <a class="btn btn-outline-primary" [routerLink]="routeCreator.bankTransfer()">Transfer to bank</a>
    } @else {
      <a class="btn btn-outline-warning" (click)="goBack()">Сome back to earn more</a>
    }
    <div class="input-group">
        <span class="input-group-text">
          <svg class="bi">
            <use [attr.xlink:href]="'#' + symbols.coin"/>
          </svg>
        </span>
      <input class="form-control" type="text" value="{{ bankBalance }}" aria-label="Wallet balance" disabled
             readonly>
      <div ngbDropdown class="d-inline-block">
        <button type="button" class="dropdown-toggle dropdown-toggle-split btn btn-outline-secondary"
                id="wallet-actions" ngbDropdownToggle>
          <svg class="bi" style="width:2rem;height:2rem">
            <use [attr.xlink:href]="'#' + symbols.arrowUpRight"/>
          </svg>
        </button>
        <div ngbDropdownMenu aria-labelledby="wallet-actions">
          <a ngbDropdownItem [routerLink]="routeCreator.bankWithdraw()" [disabled]="bankBalance < 1">To Withdraw</a>
          <a ngbDropdownItem [routerLink]="routeCreator.bankDeposit()">Deposit</a>
        </div>
      </div>
    </div>
  `,
})
export class MainComponent implements OnInit {
  protected bankBalance: number = 0
  protected ownBalance: number = 0

  constructor(
    private twa: TwaService,
    private coin: CoinsService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.twa.cloudStorage.getItem(STORAGE_KEY_BALANCE, (error?: string|null, result?: string) => {
      if (error) {
        this.twa.showAlert(error)
        return
      }
      if (result) {
        this.ownBalance = +result
      }
    })
  }

  goBack() {
    this.router.navigate([routeCreator.main()])
  }

  protected readonly symbols = symbols;
  protected readonly routeCreator = routeCreator;
}
