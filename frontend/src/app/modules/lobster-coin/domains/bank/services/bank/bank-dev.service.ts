import {Injectable} from '@angular/core';
import {BankInterface} from './bank.interface';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BankDevService implements BankInterface {
  balanceSubject = new Subject<number>();
  private _balance: number = 0;

  get balance(): number {
    return this._balance
  }

  set balance(balance: number) {
    this._balance = balance
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
