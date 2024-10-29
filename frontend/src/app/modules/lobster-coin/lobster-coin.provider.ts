import {APP_INITIALIZER, EnvironmentProviders, Provider} from '@angular/core';
import {bankProviders} from './domains/bank/bank.provider';
import {coinsProviders} from './domains/coins/coins.provider';
import {CoinsService} from './domains/coins/services/coins.service';
import {firstValueFrom} from 'rxjs';

export const lobsterCoinProviders: Array<Provider | EnvironmentProviders> = [
  ...coinsProviders,
  ...bankProviders,
  {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    multi: true,
    deps: [CoinsService],
  },
]

function initializeApp(coinsService: CoinsService) {
  coinsService.loadBalance()
  return (): Promise<any> => firstValueFrom(coinsService.balanceSubject);
}
