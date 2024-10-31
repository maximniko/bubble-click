import {Deposit} from '../../interfaces/deposit.interface';
import {Observable, Subject} from 'rxjs';

export interface DepositInterface {
  depositsSubject: Subject<Deposit[]>;
  deposits: Deposit[];

  saveDeposits(deposits: Deposit[], onComplete?: (observable: Observable<void>) => void): void;

  loadDeposits(onComplete?: (observable: Observable<void>) => void): void;
}
