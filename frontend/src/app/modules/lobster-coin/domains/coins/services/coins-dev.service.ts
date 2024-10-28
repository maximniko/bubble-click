import {Injectable} from '@angular/core';
import {debounceTime, scan, Subject} from 'rxjs';
import {CoinsInterface} from './coins.interface';

@Injectable({providedIn: 'root'})
export class CoinsDevService implements CoinsInterface {
  private clickSubject = new Subject<void>();
  _balance: number = 0;
  perClick: number = 1;
  _acc: number = 0;

  constructor() {
    this.subscribeToClicks()
  }

  get balance(): number {
    return this._balance
  }

  set balance(balance: number) {
    this._balance = balance
  }

  private subscribeToClicks() {
    this.clickSubject
      .pipe(
        scan(acc => acc + this.perClick, this._acc), // Суммируем клики
        debounceTime(500), // Ожидаем 500мс после последнего клика
      )
      .subscribe(clickCount => {
        this._acc = 0
        this.saveBalance(this.balance + clickCount)
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
}
