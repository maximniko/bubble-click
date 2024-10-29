import {EnvironmentProviders, Provider} from '@angular/core';
import {bankProviders} from './domains/bank/bank.provider';
import {coinsProviders} from './domains/coins/coins.provider';

export const lobsterCoinProviders: Array<Provider | EnvironmentProviders> = [
  ...coinsProviders,
  ...bankProviders,
]
