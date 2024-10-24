import {Injectable} from '@angular/core';
import {debounceTime, scan, Subject} from 'rxjs';
import {CoinsInterface} from './coins.interface';

@Injectable({providedIn: 'root'})
export class CoinsDevService implements CoinsInterface {
  private clickSubject = new Subject<void>();
  _balance: number = 0;
  perClick: number = 1;

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
        // Суммируем клики
        scan((acc) => acc + this.perClick, 0),
        // Ожидаем 500мс после последнего клика
        debounceTime(500)
      ).subscribe(clickCount => {
      this.balance = clickCount;
      this.saveBalance(this.balance)
    })
  }

  onClick(): void {
    // Добавляем событие в поток при каждом клике
    console.log('onClick')
    this.clickSubject.next();
  }

  private saveBalance(balance: number) {
    console.log(`Сохранен баланс ${balance}`);
  }
}
