import {Deposit} from '../../interfaces/deposit.interface';
import {BehaviorSubject, Observable} from 'rxjs';

export interface DepositInterface {
  depositsSubject: BehaviorSubject<Deposit[]>;
  deposits: Deposit[];

  saveDeposits(deposits: Deposit[], onComplete?: (observable: Observable<void>) => void): void;

  loadDeposits(onComplete?: () => void): void;
}
