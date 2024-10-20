import {Injectable} from '@angular/core';
import {STORAGE_MAX_VALUE_LENGTH} from '../../../../../../common/services/twa.service';
import {Deposit} from '../../interfaces/deposit.interface';
import {DepositInterface} from './deposit.interface';

@Injectable({providedIn: 'root'})
export class DepositDevService implements DepositInterface {
  _deposits: Deposit[] = [];

  canSave(deposits: Deposit[]): boolean {
    return JSON.stringify(deposits).length < STORAGE_MAX_VALUE_LENGTH
  }

  get deposits(): Deposit[] {
    return this._deposits
  }

  set deposits(deposits: Deposit[]) {
    this._deposits = deposits
  }
}

