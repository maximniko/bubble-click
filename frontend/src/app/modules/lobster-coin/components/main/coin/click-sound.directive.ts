import {Directive, Input, OnInit} from '@angular/core';
import {CoinSoundService} from '../../../domains/coins/coin-sound.service';

@Directive({
  standalone: true,
  selector: '[appClickSound]',
})
export class ClickSoundDirective implements OnInit {

  @Input() appClickSound: { withSound: boolean, sound: number } = {withSound: true, sound: 1}

  constructor(private coinSoundService: CoinSoundService) {
  }

  ngOnInit() {
    this.addSound()
  }

  addSound() {
    // Проверяем, если уже играет максимальное количество звуков
    if (!this.appClickSound.withSound) {
      return
    }

    this.coinSoundService.play(this.appClickSound.sound)
  }
}
