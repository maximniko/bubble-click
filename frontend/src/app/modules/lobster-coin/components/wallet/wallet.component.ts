import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {STORAGE_KEY_WALLET, TwaService} from "../../../../common/services/twa.service";
import {symbols} from '../../../../common/components/symbols/symbols';
import {WalletBalanceComponent} from './_inputs/wallet-balance.component';

@Component({
  standalone: true,
  imports: [CommonModule, WalletBalanceComponent],
  templateUrl: './wallet.component.html',
  host: {class: 'd-flex flex-column h-100'},
})
export class WalletComponent implements OnInit, OnDestroy {
  protected walletBalance = 0

  constructor(
    protected twa: TwaService,
    protected location: Location,
  ) {
  }

  ngOnInit(): void {
    this.twa.backButtonOnClick(() => this.goBack())
    this.twa.cloudStorage.getItem(STORAGE_KEY_WALLET, (error?: string|null, result?: string) => {
      if (error) {
        this.twa.showAlert(error)
        return
      }
      if (result) {
        this.walletBalance = +result
      }
    })
  }

  ngOnDestroy(): void {
    this.twa.offBackButton(() => this.goBack())
  }

  goBack() {
    this.location.back()
  }

  protected readonly symbols = symbols;
}
