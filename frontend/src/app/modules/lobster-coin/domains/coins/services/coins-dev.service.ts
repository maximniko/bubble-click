import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CoinsService} from './coins.service';

@Injectable({providedIn: 'root'})
export class CoinsDevService extends CoinsService {
  override saveBalance(balance: number) {
    this.balance = balance
    console.log(`Сохранен баланс ${balance}`);
  }

  override loadBalance(onComplete?: (observable: Observable<void>) => void) {
    this.balance = 100
  }
}
