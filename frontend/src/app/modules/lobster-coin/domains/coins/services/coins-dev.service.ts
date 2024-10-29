import {Injectable} from '@angular/core';
import {debounceTime, Observable, scan, startWith, Subject, switchMap, tap} from 'rxjs';
import {CoinsInterface} from './coins.interface';
import {fromSubscribable} from 'rxjs/internal/observable/fromSubscribable';

@Injectable({providedIn: 'root'})
export class CoinsDevService implements CoinsInterface {
  private clickSubject = new Subject<void>();
  private trigger$ = new Subject<void>();
  message = new Subject<string>();
  balanceSubject = new Subject<number>();
  _balance: number = 0;
  perClick: number = 1;

  constructor() {
    this.subscribeToClicks()
  }

  get balance(): number {
    console.log('get balance ', this._balance)
    return this._balance
  }

  set balance(balance: number) {
    this._balance = balance
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
    this.balanceSubject.next(balance)
    console.log(`Сохранен баланс ${balance}`);
  }

  loadBalance(onComplete?: (observable: Observable<void>) => void) {
    setTimeout(() => this.saveBalance(100), 500)
    // this.saveBalance(100)
  }
}
