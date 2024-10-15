import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withComponentInputBinding, withInMemoryScrolling
} from '@angular/router';
import {routes} from "./app.routes";

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appRoutesProvider = provideRouter(routes, ...[withComponentInputBinding(), inMemoryScrollingFeature]);
