import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {appRoutesProvider} from './app.routes.provider';
import {interceptors} from './common/interceptors.provider';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
import {lobsterCoinProviders} from './modules/lobster-coin/lobster-coin.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    appRoutesProvider,
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    ...interceptors,
    ...lobsterCoinProviders,
  ]
};
