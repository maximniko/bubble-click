import {Injectable} from '@angular/core';
import {BankInterface} from './bank.interface';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BankDevService implements BankInterface {
  balanceSubject = new BehaviorSubject<number>(0);
  private _balance: number = 0;

  get balance(): number {
    return this._balance
  }

  set balance(balance: number) {
    this._balance = balance
    this.balanceSubject.next(balance)
  }

  private saveBalance(balance: number) {
    this.balance = balance
    console.log(`Сохранен баланс ${balance}`);
  }

  loadBalance(onComplete?: (observable: Observable<void>) => void) {
    this.balance = 0
  }
}
