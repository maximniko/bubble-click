import {Observable} from 'rxjs';

export interface CoinsInterface {
  balance: number
  onClick(): void
  loadBalance(onComplete?: (observable: Observable<void>) => void): void
  saveBalance(balance: number, onComplete?: (observable: Observable<void>) => void): void
}
