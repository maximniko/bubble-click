import {Injectable} from '@angular/core';
import {STORAGE_KEY_BANK, TwaService} from '../../../../../../common/services/twa.service';
import {BankInterface} from './bank.interface';
import {CloudStorage} from '../../../../../../common/services/cloud-storage';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BankService implements BankInterface {
  balanceSubject = new BehaviorSubject<number>(0);
  private _balance: number = 0;

  constructor(
    private twa: TwaService,
    private cloudStorage: CloudStorage
  ) {
    this.loadBalance()
  }

  get balance(): number {
    return this._balance
  }

  protected set balance(balance: number) {
    this._balance = balance
    this.balanceSubject.next(balance)
  }

  loadBalance(onComplete?: (observable: Observable<void>) => void): void {
    this.cloudStorage.getItem(STORAGE_KEY_BANK)
      .subscribe({
        next: (x) => {
          if (x) {
            if (isNaN(+x)) {
              this.balance = 0
              return
            }
            this.balance = +x
          } else {
            this.balance = 0
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

  saveBalance(balance: number, onComplete?: (observable: Observable<void>) => void): void {
    if (isNaN(balance) || balance < 0) {
      throw new Error('Wrong bank data')
    }
    this.cloudStorage.setItem(STORAGE_KEY_BANK, String(balance))
      .subscribe({
        next: (x) => {
          if (x) {
            this.balance = balance
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
          onComplete(new Observable(subscriber => subscriber.next()))
          console.log('Balance saved');
        },
      })
  }
}

