import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {STORAGE_KEY_TURBO, TwaService} from '../../../../../../common/services/twa.service';
import {CloudStorage} from '../../../../../../common/services/cloud-storage';
import {jsonParse} from '../../../../../../common/extensions/String';
import {Turbo, TURBO_ITEMS, TurboInterface} from './turbo.interface';

@Injectable({providedIn: 'root'})
export class TurboService implements TurboInterface {

  perClickSubject = new BehaviorSubject<number>(1);
  turbosSubject = new BehaviorSubject<Turbo[]>([]);

  private _perClick: number = 1;
  private _turbos: Turbo[] = [];

  constructor(
    private cloudStorage: CloudStorage,
    private twa: TwaService,
  ) {
    this.loadTurbos()
  }

  protected get perClick(): number {
    return this._perClick
  }

  protected set perClick(perClick: number) {
    this._perClick = perClick
    this.perClickSubject.next(perClick)
  }

  public get turbos(): Turbo[] {
    return this._turbos
  }

  public set turbos(turbos: Turbo[]) {
    this._turbos = turbos
    this.turbosSubject.next(turbos)
  }

  loadTurbos(): void {
    this.cloudStorage.getItem(STORAGE_KEY_TURBO)
      .subscribe({
        next: (items) => {
          if (items) {
            const turbos = this.valueToTurbos(items)
            this.turbos = turbos
            this.perClick = this.takePerClick(turbos)
          }
        },
        error: (err) => {
          if (err) {
            throw new Error(err)
          }
        },
        complete: () => {
          console.log('per click loaded');
        },
      })
  }

  saveTurbos(turbos: Turbo[]): void {
    if (!turbos.length) {
      return
    }

    this.cloudStorage.setItem(STORAGE_KEY_TURBO, this.turbosToValue(turbos))
      .subscribe({
        next: (x) => {
          this.turbos = turbos
          this.perClick = this.takePerClick(turbos)
        },
        error: (err) => {
          if (err) {
            this.twa.showAlert(err.toString())
          }
        },
        complete: () => {
          console.log('Per Click saved');
        },
      })
  }

  protected takePerClick(turbos: Turbo[]): number {
    return turbos.sort(
      (a: Turbo, b: Turbo) => a.level < b.level ? 1 : -1
    )[0].perClick
  }

  protected turbosToValue(turbos: Turbo[]): string {
    return JSON.stringify(turbos.map(
      (item: Turbo) => [item.level]
    ))
  }

  protected valueToTurbos(value: string): Turbo[] {
    const items = jsonParse<number[][]>(value)

    if (!items) {
      return []
    }

    const turboItems: Turbo[] = TURBO_ITEMS

    return items.map<Turbo>((item: number[]) => {
      return turboItems.find((i: Turbo) => i.level == item[0])!
    })
  }
}
