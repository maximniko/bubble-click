import {Injectable} from '@angular/core';
import {STORAGE_KEY_BANK, TwaService} from '../../../../../../common/services/twa.service';
import {BankInterface} from './bank.interface';

@Injectable({providedIn: 'root'})
export class BankService implements BankInterface {
  private _balance: number = 0;

  constructor(private twa: TwaService) {
    this.loadBalance()
  }

  get balance(): number {
    this.loadBalance()
    return this._balance
  }

  set balance(balance: number) {
    this._balance = balance
    this.saveBalance()
  }

  private saveBalance() {
    this.twa.cloudStorage.setItem(STORAGE_KEY_BANK, String(this.balance), (error?: string | null, result?: boolean) => {
      if (error) {
        this.twa.showAlert(error)
        return
      }
      if (!result) {
        this.twa.showAlert('Bank balance not updated.')
      }
      this.loadBalance()
    })
  }

  loadBalance() {
    this.twa.cloudStorage.getItem(STORAGE_KEY_BANK, (error?: string | null, result?: string) => {
      if (error) {
        this.twa.showAlert(error)
        return
      }
      if (result) {
        this._balance = +result
      }
    })
  }
}

