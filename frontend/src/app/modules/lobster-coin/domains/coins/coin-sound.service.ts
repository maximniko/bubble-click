import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class CoinSoundService {
  private readonly sounds: HTMLAudioElement[]
  private activeSounds: number = 0
  private maxConcurrentSounds = 5

  constructor() {
    this.sounds = AUDIO_ITEMS.map<HTMLAudioElement>(fileName => new Audio(AUDIO_PATH + fileName))
  }

  play(index: number): void {
    if (this.activeSounds >= this.maxConcurrentSounds) {
      return
    }
    // Определяем какой звук воспроизводить
    const soundKeys = Object.keys(this.sounds);
    const soundIndex = index % soundKeys.length;
    const selectedSound = this.sounds[soundIndex];

    // Если звук уже проигрывается, начинаем сначала
    // if (!selectedSound.paused) {
    //   selectedSound.fastSeek(0);
    // }

    // Воспроизводим звук и добавляем его в список активных
    selectedSound.play();
    this.activeSounds++

    // Удаляем из активных звуков при завершении воспроизведения
    selectedSound.onended = () => {
      // this.sounds[soundIndex].currentTime = 0
      this.activeSounds--
    };

    // Если нужно сразу удалить из очереди при остановке вручную
    // audio.addEventListener('pause', () => {
    //   this.activeSounds = this.activeSounds.filter(a => a !== audio)
    // })
  }
}

const AUDIO_PATH = 'assets/coin/sounds/'
const AUDIO_ITEMS = [
  '1-1.opus',
  '1-2.opus',
  '1-3.opus',
  '1-4.opus',
  '1-5.opus',
  '2-1.opus',
  '2-2.opus',
  '2-3.opus',
  '2-4.opus',
  '2-5.opus',
  '3-1.opus',
  '3-2.opus',
  '3-3.opus',
  '3-4.opus',
]
