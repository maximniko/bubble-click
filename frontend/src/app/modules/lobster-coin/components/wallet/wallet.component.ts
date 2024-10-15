import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {TwaService} from "../../../../common/services/twa.service";

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallet.component.html',
  host: {class: 'd-flex flex-column h-100'},
})
export class WalletComponent implements OnInit, OnDestroy {
  constructor(
    protected twa: TwaService,
    protected location: Location,
  ) {
  }

  ngOnInit(): void {
    this.twa.backButtonOnClick(() => this.goBack())
  }

  ngOnDestroy(): void {
    this.twa.offBackButton(() => this.goBack())
  }

  goBack() {
    this.location.back()
  }
}
