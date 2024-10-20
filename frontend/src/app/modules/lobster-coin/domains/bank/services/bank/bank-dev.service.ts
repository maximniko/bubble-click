import {Injectable} from '@angular/core';
import {BankInterface} from './bank.interface';

@Injectable({providedIn: 'root'})
export class BankDevService implements BankInterface {
  private _balance: number = 0;

  get balance(): number {
    return this._balance
  }

  set balance(balance: number) {
    this._balance = balance
  }
}

