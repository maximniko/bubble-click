import {Injectable} from '@angular/core';
import {STORAGE_KEY_BANK, TwaService} from '../../../../../../common/services/twa.service';
import {BankInterface} from './bank.interface';
import {CloudStorage} from '../../../../../../common/services/cloud-storage';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BankService implements BankInterface {
  balanceSubject = new Subject<number>();
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

  private set balance(balance: number) {
    this._balance = balance
    this.balanceSubject.next(balance)
  }

  loadBalance(onComplete?: (observable: Observable<void>) => void): void {
    this.cloudStorage.getItem(STORAGE_KEY_BANK)
      .subscribe({
        next: (x) => {
          if (x) {
            this.saveBalance(+x)
          } else {
            this.saveBalance(0)
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

  saveBalance(balance: number, onComplete?: (observable: Observable<void>) => void) {
    this.cloudStorage.setItem(STORAGE_KEY_BANK, String(balance))
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

