import {Injectable} from '@angular/core';
import {Turbo} from './turbo.interface';
import {TurboService} from './turbo.service';

@Injectable({providedIn: 'root'})
export class TurboDevService extends TurboService {

  override loadTurbos(): void {
    const items = this.turbosToValue([
      {
        level: 1,
        perClick: 2,
        coins: {now: 100}
      },
      {
        level: 2,
        perClick: 3,
        coins: {now: 100}
      },
    ])
    if (items) {
      this.turbos = this.valueToTurbos(items)
      this.perClick = this.takePerClick(this.turbos)
    }
  }

  override saveTurbos(turbos: Turbo[]): void {
    if (!turbos.length) {
      return
    }
    this.turbos = turbos
    this.perClick = this.takePerClick(turbos)
  }
}
