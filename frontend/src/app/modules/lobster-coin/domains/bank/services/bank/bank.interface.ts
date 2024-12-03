import {BehaviorSubject, Observable} from 'rxjs';

export interface BankInterface {
  balanceSubject: BehaviorSubject<number>;
  balance: number;
  loadBalance(onComplete?: (observable: Observable<void>) => void): void
  saveBalance(balance: number, onComplete?: (observable: Observable<void>) => void): void
}
