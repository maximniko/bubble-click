import {Directive, Input, OnInit} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appClickSound]',
})
export class ClickSoundDirective implements OnInit {

  @Input() appClickSound: { withSound: boolean, sound: number } = {withSound: true, sound: 1}

  private sounds: Sound[] = [
    {name: '1-1.mp3'},
    {name: '1-2.mp3'},
    {name: '1-3.mp3'},
    {name: '1-4.mp3'},
    {name: '1-5.mp3'},
    {name: '2-1.mp3'},
    {name: '2-2.mp3'},
    {name: '2-3.mp3'},
    {name: '2-4.mp3'},
    {name: '2-5.mp3'},
    {name: '3-1.mp3'},
    {name: '3-2.mp3'},
    {name: '3-3.mp3'},
    {name: '3-4.mp3'},
  ]

  private activeSounds: HTMLAudioElement[] = []
  private maxConcurrentSounds = 2

  ngOnInit() {
    this.addSound()
  }

  addSound() {
    // Проверяем, если уже играет максимальное количество звуков
    if (!this.appClickSound.withSound || this.activeSounds.length >= this.maxConcurrentSounds) {
      return
    }

    // Выбираем звук на основе appClickSound
    const soundIndex = this.appClickSound.sound % this.sounds.length
    const audio = new Audio(`assets/coin/sounds/${this.sounds[soundIndex].name}`)

    // Удаляем звук из очереди после его окончания
    audio.addEventListener('ended', () => {
      this.activeSounds = this.activeSounds.filter(a => a !== audio)
    })

    // Добавляем звук в очередь и воспроизводим
    this.activeSounds.push(audio)
    audio.play()


    // Если нужно сразу удалить из очереди при остановке вручную
    // audio.addEventListener('pause', () => {
    //   this.activeSounds = this.activeSounds.filter(a => a !== audio)
    // })
  }
}

interface Sound {
  name: string
}
