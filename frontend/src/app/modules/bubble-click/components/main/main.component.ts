import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";
import {TwaService} from "../../../../common/services/twa.service";
import {CoinComponent} from './coin/coin.component';
import {symbols} from '../../../../common/components/symbols/symbols';
import {CoinSoundService} from '../../domains/coins/coin-sound.service';

@Component({
  standalone: true,
  imports: [CommonModule, CoinComponent],
  templateUrl: './main.component.html',
  styles:`
    .coin-layout {
      width: 100%;
      height: 100%;
      display: flex;
      background: linear-gradient(220deg, rgba(0,133,255,.3) 0%, rgba(254,200,255,.3) 100%);
    }
  `,
  host: {class: 'd-flex flex-column h-100'},
})
export class MainComponent implements OnInit {
  constructor(
    protected coinSoundService: CoinSoundService,
    protected twa: TwaService,
    protected router: Router
  ) {
  }

  ngOnInit(): void {
    this.twa.visibleBackButton(false)
  }

  toggleWithSound() {
    this.coinSoundService.withSound = !this.coinSoundService.withSound
    this.twa.hapticFeedbackNotificationOccurred(this.coinSoundService.withSound ? 'success' : 'warning')
  }

  protected readonly symbols = symbols;
}
