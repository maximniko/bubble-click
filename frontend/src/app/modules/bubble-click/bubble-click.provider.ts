import {EnvironmentProviders, Provider} from '@angular/core';
import {bankProviders} from './domains/bank/bank.provider';
import {coinsProviders} from './domains/coins/coins.provider';
import {turboProviders} from './domains/coins/turbo.provider';

export const bubbleClickProviders: Array<Provider | EnvironmentProviders> = [
  ...coinsProviders,
  ...turboProviders,
  ...bankProviders,
]
