import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {STORAGE_KEY_BALANCE, TwaService} from '../../../../../../common/services/twa.service';
import {CoinsInterface} from './coins.interface';
import {CloudStorage} from '../../../../../../common/services/cloud-storage';

@Injectable({providedIn: 'root'})
export class CoinsService implements CoinsInterface {
  balanceSubject = new BehaviorSubject<number>(0);
  protected _balance: number = 0;

  constructor(
    private cloudStorage: CloudStorage,
    private twa: TwaService,
  ) {
    this.loadBalance()
  }

  get balance(): number {
    return this._balance
  }

  set balance(balance: number) {
    this._balance = balance
    this.balanceSubject.next(balance)
  }

  loadBalance(onComplete?: (observable: Observable<void>) => void): void {
    this.cloudStorage.getItem(STORAGE_KEY_BALANCE)
      .subscribe({
        next: (x) => {
          this.balance = x ? +x : 0
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
          onComplete(new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
          }))
        },
      })
  }

  saveClicks(clicks: number): void {
    this.saveBalance(this.balance + clicks)
  }

  saveBalance(balance: number, onComplete?: (observable: Observable<void>) => void): void {
    if (isNaN(balance) || balance < 0) {
      throw new Error('Wrong coins data')
    }
    this.cloudStorage.setItem(STORAGE_KEY_BALANCE, String(balance))
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
        },
      })
  }
}
