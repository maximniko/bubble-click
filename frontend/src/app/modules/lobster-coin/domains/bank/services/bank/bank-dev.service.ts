import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BankService} from './bank.service';

@Injectable({providedIn: 'root'})
export class BankDevService extends BankService {
  override saveBalance(balance: number) {
    this.balance = balance
    console.log(`Сохранен баланс банка ${balance}`);
  }

  override loadBalance(onComplete?: (observable: Observable<void>) => void) {
    this.balance = 10
  }
}
