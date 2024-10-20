import {CommonModule, Location} from '@angular/common';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {symbols} from '../../../../../common/components/symbols/symbols';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    withdraw
    <button (click)="goBack()">back</button>
  `,
})
export class WithdrawComponent implements OnChanges {
  @Input() walletBalance?: number = 0

  constructor(private location: Location) {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['walletBalance']) {
      this.walletBalance = +changes['walletBalance'].currentValue
    }
  }

  goBack() {
    this.location.back()
  }
  protected readonly symbols = symbols;
}
