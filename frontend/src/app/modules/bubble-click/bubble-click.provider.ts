import {APP_INITIALIZER, EnvironmentProviders, Provider} from '@angular/core';
import {bankProviders} from './domains/bank/bank.provider';
import {coinsProviders} from './domains/coins/coins.provider';
import {turboProviders} from './domains/coins/turbo.provider';
import {Localisation} from '../../common/services/localisation';

export const bubbleClickProviders: Array<Provider | EnvironmentProviders> = [
  ...coinsProviders,
  ...turboProviders,
  ...bankProviders,
  {
    provide: APP_INITIALIZER,
    useFactory: initializeTranslations,
    multi: true,
    deps: [Localisation],
  },
]

export function initializeTranslations(localisation: Localisation) {
  return localisation.load;
}
