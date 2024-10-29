import {Injectable} from '@angular/core';
import {BehaviorSubject, debounceTime, Observable, scan, startWith, Subject, switchMap, tap} from 'rxjs';
import {CoinsInterface} from './coins.interface';
import {fromSubscribable} from 'rxjs/internal/observable/fromSubscribable';

@Injectable({providedIn: 'root'})
export class CoinsDevService implements CoinsInterface {
  private clickSubject = new Subject<void>();
  private trigger$ = new Subject<void>();
  balanceSubject = new BehaviorSubject<number>(0);
  _balance: number = 0;
  perClick: number = 1;

  constructor() {
    this.subscribeToClicks()
    this.loadBalance()
  }

  get balance(): number {
    console.log('get balance ', this._balance)
    return this._balance
  }

  set balance(balance: number) {
    this._balance = balance
    this.balanceSubject.next(balance)
  }

  private subscribeToClicks() {
    this.trigger$
      .pipe(
        startWith(void 0),
        switchMap(() => fromSubscribable(this.clickSubject).pipe(scan((acc) => acc + 1, 0))),
        debounceTime(500),
        tap(() => this.trigger$.next())
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

  private saveBalance(balance: number) {
    this.balance = balance
    console.log(`Сохранен баланс ${balance}`);
  }

  loadBalance(onComplete?: (observable: Observable<void>) => void) {
    this.balance = 100
  }
}
