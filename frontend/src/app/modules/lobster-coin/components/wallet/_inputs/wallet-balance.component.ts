import {CommonModule} from '@angular/common';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {symbols} from '../../../../../common/components/symbols/symbols';

@Component({
  selector: 'wallet-balance-input',
  standalone: true,
  imports: [CommonModule, NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle],
  styles: `
    .dropdown-toggle::after {
      content: none;
    }`,
  template: `
    <div class="input-group">
        <span class="input-group-text">
          <svg class="bi">
            <use [attr.xlink:href]="'#' + symbols.coin"/>
          </svg>
        </span>
      <input class="form-control" type="text" value="{{ walletBalance ?? 0 }}" aria-label="Wallet balance" disabled
             readonly>
      <div ngbDropdown class="d-inline-block">
        <button type="button" class="dropdown-toggle dropdown-toggle-split btn btn-outline-secondary"
                id="wallet-actions" ngbDropdownToggle>
          <svg class="bi" style="width:2rem;height:2rem">
            <use [attr.xlink:href]="'#' + symbols.arrowUpRight"/>
          </svg>
        </button>
        <div ngbDropdownMenu aria-labelledby="wallet-actions">
          <button ngbDropdownItem>To Deposit</button>
          <button ngbDropdownItem>Withdraw</button>
        </div>
      </div>
    </div>
  `,
})
export class WalletBalanceComponent implements OnChanges {
  @Input() walletBalance: number = 0

  ngOnChanges(changes: SimpleChanges) {
    if (changes['walletBalance']) {
      this.walletBalance = +changes['walletBalance'].currentValue
    }
  }

  protected readonly symbols = symbols;
}
