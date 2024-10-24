import {Injectable} from '@angular/core';
import {debounceTime, scan, Subject} from 'rxjs';
import {STORAGE_KEY_BALANCE, TwaService} from '../../../../../common/services/twa.service';
import {CoinsInterface} from './coins.interface';

@Injectable({providedIn: 'root'})
export class CoinsService implements CoinsInterface {
  private clickSubject = new Subject<void>();
  _balance: number = 0;
  perClick: number = 1;

  constructor(private twa: TwaService) {
    this.loadBalance()
    this.subscribeToClicks()
  }

  get balance(): number {
    this.loadBalance()
    return this._balance
  }

  set balance(balance: number) {
    this._balance = balance
    this.saveBalance(this.balance)
  }

  private subscribeToClicks() {
    this.clickSubject
      .pipe(
        // Суммируем клики
        scan(acc => acc + this.perClick, 0),
        // Ожидаем 500мс после последнего клика
        debounceTime(500)
      ).subscribe(clickCount => {
      this.balance = clickCount;
      this.saveBalance(clickCount);
    })
  }

  onClick(): void {
    // Добавляем событие в поток при каждом клике
    console.log('onClick')
    this.clickSubject.next();
  }

  loadBalance() {
    this.twa.cloudStorage.getItem(STORAGE_KEY_BALANCE, (error?: string|null, result?: string) => {
      if (error) {
        this.twa.showAlert(error)
        return
      }
      if (result) {
        this.balance = +result
      }
    })
  }

  private saveBalance(balance: number) {
    this.twa.cloudStorage.setItem(STORAGE_KEY_BALANCE, String(balance), (error?: string|null, result?: boolean) => {
      if (error) {
        this.twa.showAlert(error)
        return
      }
      if (!result) {
        this.twa.showAlert('Can\'t save balance');
      }
      this.loadBalance()
    })
  }
}
