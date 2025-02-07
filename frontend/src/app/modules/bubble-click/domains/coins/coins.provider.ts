import {EnvironmentProviders, Provider} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {CoinsService} from './services/coins/coins.service';
import {CoinsDevService} from './services/coins/coins-dev.service';

export const coinsProviders: Array<Provider | EnvironmentProviders> = [
  {provide: CoinsService, useClass: environment.production ? CoinsService : CoinsDevService},
]
