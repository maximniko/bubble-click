import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";
import {TwaService} from "../../../../common/services/twa.service";
import {CoinComponent} from './coin/coin.component';
import {symbols} from '../../../../common/components/symbols/symbols';

@Component({
  standalone: true,
  imports: [CommonModule, CoinComponent],
  templateUrl: './main.component.html',
  host: {class: 'd-flex flex-column h-100'},
})
export class MainComponent implements OnInit {
  protected withSound = true

  constructor(
    protected twa: TwaService,
    protected router: Router
  ) {
  }

  ngOnInit(): void {
    this.twa.visibleBackButton(false)
  }

  toggleSound() {
    this.withSound = !this.withSound
  }

  protected readonly symbols = symbols;
}
