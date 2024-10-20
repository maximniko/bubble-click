import {Injectable} from '@angular/core';
import {
  STORAGE_KEY_BANK_DEPOSIT,
  STORAGE_MAX_VALUE_LENGTH,
  TwaService
} from '../../../../../../common/services/twa.service';
import {Deposit, DEPOSIT_PLANS, DepositPlan} from '../../interfaces/deposit.interface';
import {toParamDate} from '../../../../../../common/extensions/Date';
import {environment} from '../../../../../../../environments/environment';
import {DepositInterface} from './deposit.interface';

@Injectable({providedIn: 'root'})
export class DepositService implements DepositInterface {
  private _deposits: Deposit[] = [];

  constructor(private twa: TwaService) {
    this.loadDeposits()
  }

  canSave(deposits: Deposit[]): boolean {
    return this.depositsToValue(deposits).length < STORAGE_MAX_VALUE_LENGTH
  }

  get deposits(): Deposit[] {
    return this._deposits
  }

  set deposits(deposits: Deposit[]) {
    this._deposits = deposits
    this.saveDeposits()
  }

  private saveDeposits() {
    if (!environment.production) {
      return
    }
    this.twa.cloudStorage.setItem(
      STORAGE_KEY_BANK_DEPOSIT,
      this.depositsToValue(this.deposits),
      (error?: string | null, result?: boolean) => {
        if (error) {
          this.twa.showAlert(error)
          return
        }
        if (!result) {
          this.twa.showAlert('Bank Deposits not updated.')
        }
      },
    )
  }

  private depositsToValue(deposits: Deposit[]): string {
    return JSON.stringify(deposits.map(
      (item: Deposit) => [item.plan.id, toParamDate(item.fromDate), item.sum]
    ))
  }

  private valueToDeposits(value: string): Deposit[] {
    const plans = DEPOSIT_PLANS
    return (JSON.parse(value) as [number, string, number][]).map(
      (item: [number, string, number]) => {
        return {
          plan: plans.find((i: DepositPlan) => i.id == item[0])!,
          fromDate: new Date(item[1]),
          sum: item[2]
        }
      }) as Deposit[]
  }

  private loadDeposits() {
    this.twa.cloudStorage.getItem(STORAGE_KEY_BANK_DEPOSIT, (error?: string | null, result?: string) => {
      if (error) {
        this.twa.showAlert(error)
        return
      }
      if (result) {
        this._deposits = this.valueToDeposits(result)
      }
    })
  }
}

