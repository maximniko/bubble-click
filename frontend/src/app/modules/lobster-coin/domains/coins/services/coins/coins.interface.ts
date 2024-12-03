import {Observable} from 'rxjs';

export interface CoinsInterface {
  balance: number
  loadBalance(onComplete?: (observable: Observable<void>) => void): void
  saveBalance(balance: number, onComplete?: (observable: Observable<void>) => void): void
  saveClicks(clicks: number): void
}
