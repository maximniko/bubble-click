import {Injectable} from '@angular/core';
import {debounceTime, Observable, scan, startWith, Subject, switchMap, tap} from 'rxjs';
import {STORAGE_KEY_BALANCE, TwaService} from '../../../../../common/services/twa.service';
import {CoinsInterface} from './coins.interface';
import {CloudStorage} from '../../../../../common/services/cloud-storage';
import {fromSubscribable} from 'rxjs/internal/observable/fromSubscribable';

@Injectable({providedIn: 'root'})
export class CoinsService implements CoinsInterface {
  private clickSubject = new Subject<void>();
  private trigger$ = new Subject<void>();
  balanceSubject = new Subject<number>();
  perClick: number = 1;
  private _balance: number = 0;

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

  protected set balance(balance: number) {
    this._balance = balance
    this.balanceSubject.next(balance)
  }

  private subscribeToClicks() {
    this.trigger$
      .pipe(
        startWith(void 0),
        switchMap(() => fromSubscribable(this.clickSubject).pipe(scan((acc) => acc + 1, 0))),
        debounceTime(500),
        tap(() => this.trigger$.next()),
      )
      .subscribe(clicks => {
        this.saveBalance(this.balance + clicks * this.perClick)
      })
  }

  onClick(): void {
    // Добавляем событие в поток при каждом клике
    console.log('onClick')
    this.clickSubject.next();
  }

  loadBalance(onComplete?: (observable: Observable<void>) => void): void {
    this.cloudStorage.getItem(STORAGE_KEY_BALANCE)
      .subscribe({
        next: (x) => {
          if (x) {
            this.balance = +x
          } else {
            this.balance = 0
          }
        },
        error: (err) => {
          if (err) {
            throw new Error(err)
          }
        },
        complete: () => {
          if (!onComplete) {
            return
          }
          onComplete(new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
          }))
          console.log('balance loaded');
        },
      })
  }

  saveBalance(balance: number, onComplete?: (observable: Observable<void>) => void): void {
    if (isNaN(balance) || balance < 0) {
      throw new Error('Wrong coins data')
    }
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
