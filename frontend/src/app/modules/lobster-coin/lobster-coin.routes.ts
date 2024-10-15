import {Routes} from '@angular/router';

const ROUTE_PARTS = {
  lobsterCoin: 'lobster-coin',
  main: 'main',
  wallet: 'wallet',
  friends: 'friends',
}
export const routeCreator = {
  main: () => `/${ROUTE_PARTS.lobsterCoin}/${ROUTE_PARTS.main}`,
  wallet: () => `/${ROUTE_PARTS.lobsterCoin}/${ROUTE_PARTS.wallet}`,
  friends: () => `/${ROUTE_PARTS.lobsterCoin}/${ROUTE_PARTS.friends}`,
}

export const lobsterCoinRoutes: Routes = [
  {
    path: `${ROUTE_PARTS.lobsterCoin}`,
    loadComponent: () => import('./lobster-coin.component').then(mod => mod.LobsterCoinComponent),
    children: [
      {path: '', redirectTo: routeCreator.main(), pathMatch: 'full'},
      {
        path: `${ROUTE_PARTS.main}`,
        loadComponent: () => import('./components/main/main.component').then(mod => mod.MainComponent)
      },
      {
        path: `${ROUTE_PARTS.wallet}`,
        loadComponent: () => import('./components/wallet/wallet.component').then(mod => mod.WalletComponent)
      },
      {
        path: `${ROUTE_PARTS.friends}`,
        loadComponent: () => import('./components/friends/friends.component').then(mod => mod.FriendsComponent)
      },
    ],
  }
]
