import {Injectable} from '@angular/core';
import {debounceTime, Observable, scan, Subject} from 'rxjs';
import {STORAGE_KEY_BALANCE, TwaService} from '../../../../../common/services/twa.service';
import {CoinsInterface} from './coins.interface';
import {CloudStorage} from '../../../../../common/services/cloud-storage';

@Injectable({providedIn: 'root'})
export class CoinsService implements CoinsInterface {
  private clickSubject = new Subject<void>();
  balanceSubject = new Subject<number>();
  _balance: number = 0;
  perClick: number = 1;

  constructor(
    private cloudStorage: CloudStorage,
    private twa: TwaService,
  ) {
    this.loadBalance()
    this.subscribeToClicks()
  }

  get balance(): number {
    return this._balance
  }

  private set balance(balance: number) {
    this._balance = balance
    this.balanceSubject.next(this._balance)
  }

  private subscribeToClicks() {
    this.clickSubject
      .pipe(
        scan(acc => acc + this.perClick, 0), // Суммируем клики
        debounceTime(500) // Ожидаем 500мс после последнего клика
      ).subscribe(clickCount => {
      this.balance += clickCount
      this.saveBalance(this.balance)
    })
  }

  onClick(): void {
    // Добавляем событие в поток при каждом клике
    console.log('onClick')
    this.clickSubject.next();
  }

  loadBalance(onComplete?: (observable: Observable<void>) => void) {
    this.cloudStorage.getItem(STORAGE_KEY_BALANCE)
      .subscribe({
        next: (x) => {
          if (x) {
            this.saveBalance(+x)
          } else {
            this.saveBalance(0)
          }
        },
        error: (err) => {
          if (err) {
            this.twa.showAlert(err)
          }
        },
        complete: () => {
          if (!onComplete) {
            return
          }
          onComplete(new Observable(subscriber => subscriber.next()))
          console.log('balance loaded');
        },
      })
  }

  saveBalance(balance: number, onComplete?: (observable: Observable<void>) => void) {
    this.cloudStorage.setItem(STORAGE_KEY_BALANCE, String(balance))
      .subscribe({
        next: (x) => {
          if (x) {
            this.balance = balance
          }
        },
        error: (err) => {
          if (err) {
            this.twa.showAlert(err.toString())
          }
        },
        complete: () => {
          if (!onComplete) {
            return
          }
          onComplete(new Observable(subscriber => subscriber.next()))
          console.log('Balance saved');
        },
      })
  }
}
