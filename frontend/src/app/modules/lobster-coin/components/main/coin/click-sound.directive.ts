import {Directive, Input, OnInit} from '@angular/core';
import {CoinSoundService} from '../../../domains/coins/coin-sound.service';

@Directive({
  standalone: true,
  selector: '[appClickSound]',
})
export class ClickSoundDirective implements OnInit {

  @Input() appClickSound: { sound: number } = {sound: 1}

  constructor(private coinSoundService: CoinSoundService) {
  }

  ngOnInit() {
    this.addSound()
  }

  addSound() {
    this.coinSoundService.play(this.appClickSound.sound)
  }
}
