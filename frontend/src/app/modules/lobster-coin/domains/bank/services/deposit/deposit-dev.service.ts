import {Injectable} from '@angular/core';
import {DepositService} from './deposit.service';
import {Deposit, DEPOSIT_PLANS} from '../../interfaces/deposit.interface';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DepositDevService extends DepositService {

  override saveDeposits(deposits: Deposit[], onComplete?: (observable: Observable<void>) => void) {
    this.deposits = deposits
  }

  override loadDeposits(onComplete?: (observable: Observable<void>) => void) {
    this.deposits = DEPOSIT_PLANS.map<Deposit>(plan => {
      return {
        plan: plan,
        fromDate: new Date(`2024-10-${plan.id % 30}`),
        sum: (plan.id + 1) * 100
      }
    })
  }
}

