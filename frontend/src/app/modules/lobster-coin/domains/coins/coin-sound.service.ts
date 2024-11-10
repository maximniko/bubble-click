import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class CoinSoundService {
  private readonly sounds: HTMLAudioElement[]
  private activeSounds: number[] = []
  private maxConcurrentSounds = 2

  constructor() {
    this.sounds = AUDIO_ITEMS.map<HTMLAudioElement>(fileName => new Audio(AUDIO_PATH + fileName))
  }

  play(index: number): void {
    if (this.activeSounds.length >= this.maxConcurrentSounds) {
      return
    }
    // Определяем какой звук воспроизводить
    const soundKeys = Object.keys(this.sounds);
    const soundIndex = index % soundKeys.length;
    const selectedSound = this.sounds[soundIndex];

    // Если звук уже проигрывается, начинаем сначала
    if (!selectedSound.paused) {
      selectedSound.currentTime = 0;
    }

    // Воспроизводим звук и добавляем его в список активных
    selectedSound.play();
    this.activeSounds.push(soundIndex);

    // Удаляем из активных звуков при завершении воспроизведения
    selectedSound.onended = () => {
      this.activeSounds = this.activeSounds.filter(a => a !== soundIndex);
    };

    // Если нужно сразу удалить из очереди при остановке вручную
    // audio.addEventListener('pause', () => {
    //   this.activeSounds = this.activeSounds.filter(a => a !== audio)
    // })
  }
}

const AUDIO_PATH = 'assets/coin/sounds/'
const AUDIO_ITEMS = [
  '1-1.mp3',
  '1-2.mp3',
  '1-3.mp3',
  '1-4.mp3',
  '1-5.mp3',
  '2-1.mp3',
  '2-2.mp3',
  '2-3.mp3',
  '2-4.mp3',
  '2-5.mp3',
  '3-1.mp3',
  '3-2.mp3',
  '3-3.mp3',
  '3-4.mp3',
]
