import {Injectable} from '@angular/core';
import {
  STORAGE_KEY_BANK_DEPOSIT,
  STORAGE_MAX_VALUE_LENGTH,
  TwaService
} from '../../../../../../common/services/twa.service';
import {Deposit, DEPOSIT_PLANS, DepositPlan} from '../../interfaces/deposit.interface';
import {toParamDate} from '../../../../../../common/extensions/Date';
import {DepositInterface} from './deposit.interface';
import {Observable, Subject} from 'rxjs';
import {CloudStorage} from '../../../../../../common/services/cloud-storage';
import {jsonParse} from '../../../../../../common/extensions/String';

@Injectable({providedIn: 'root'})
export class DepositService implements DepositInterface {
  depositsSubject = new Subject<Deposit[]>();
  private _deposits: Deposit[] = [];

  constructor(
    private twa: TwaService,
    private cloudStorage: CloudStorage,
  ) {
    this.loadDeposits()
  }

  get deposits(): Deposit[] {
    return this._deposits
  }

  protected set deposits(deposits: Deposit[]) {
    this._deposits = deposits
    this.depositsSubject.next(deposits)
  }

  saveDeposits(deposits: Deposit[], onComplete?: (observable: Observable<void>) => void) {
    if (!this.canSave(deposits)) {
      throw new Error('Too many deposits.')
    }
    this.cloudStorage.setItem(STORAGE_KEY_BANK_DEPOSIT, this.depositsToValue(deposits))
      .subscribe({
        next: (x) => {
          if (x) {
            this.deposits = deposits
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
        }
      })
  }

  private depositsToValue(deposits: Deposit[]): string {
    return JSON.stringify(deposits.map(
      (item: Deposit) => [item.plan.id, toParamDate(item.fromDate), item.sum]
    ))
  }

  private valueToDeposits(value: string): Deposit[] {
    const items = jsonParse<[number, string, number][]>(value)

    if (!items) {
      return []
    }

    const plans: DepositPlan[] = DEPOSIT_PLANS

    return items.map<Deposit>((item: [number, string, number]) => {
      return {
        plan: plans.find((i: DepositPlan) => i.id == item[0])!,
        fromDate: new Date(item[1]),
        sum: item[2]
      }
    })
  }

  loadDeposits(onComplete?: (observable: Observable<void>) => void) {
    this.cloudStorage.getItem(STORAGE_KEY_BANK_DEPOSIT).subscribe({
      next: (x) => {
        if (x) {
          this.deposits = this.valueToDeposits(x)
        } else {
          this.deposits = []
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
      }
    })
  }

  private canSave(deposits: Deposit[]): boolean {
    return this.depositsToValue(deposits).length < STORAGE_MAX_VALUE_LENGTH
  }
}
