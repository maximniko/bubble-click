import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {symbols} from '../../../../../common/components/symbols/symbols';

@Component({
  selector: 'wallet-withdraw',
  standalone: true,
  imports: [CommonModule],
  template: `
  `,
})
export class WalletWithdrawComponent implements OnChanges {
  @Output() withdrawEventEmitter = new EventEmitter<number>()
  @Input() walletBalance: number = 0

  onSend() {
    this.withdrawEventEmitter.emit()
  }
  protected readonly symbols = symbols;
}
