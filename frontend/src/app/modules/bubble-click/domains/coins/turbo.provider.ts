import {EnvironmentProviders, Provider} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {TurboService} from './services/turbo/turbo.service';
import {TurboDevService} from './services/turbo/turbo-dev.service';

export const turboProviders: Array<Provider | EnvironmentProviders> = [
  {provide: TurboService, useClass: environment.production ? TurboService : TurboDevService},
]
