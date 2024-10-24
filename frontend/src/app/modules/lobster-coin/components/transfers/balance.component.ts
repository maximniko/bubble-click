import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {TwaService} from "../../../../common/services/twa.service";
import {symbols} from '../../../../common/components/symbols/symbols';
import {MainComponent} from './main/main.component';
import {RouterOutlet} from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, MainComponent, RouterOutlet],
  templateUrl: './balance.component.html',
  host: {class: 'd-flex flex-column h-100'},
})
export class BalanceComponent implements OnInit, OnDestroy {
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

  protected readonly symbols = symbols;
}
