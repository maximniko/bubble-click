import {Injectable} from '@angular/core';
import {BankInterface} from './bank.interface';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BankDevService implements BankInterface {
  balanceSubject = new Subject<number>();
  private _balance: number = 10;

  get balance(): number {
    return this._balance
  }

  set balance(balance: number) {
    this._balance = balance
    this.balanceSubject.next(balance)
  }

  private saveBalance(balance: number) {
    this.balance = balance
    console.log(`Сохранен баланс банка ${balance}`);
  }

  loadBalance(onComplete?: (observable: Observable<void>) => void) {
    this.balance = 10
  }
}
