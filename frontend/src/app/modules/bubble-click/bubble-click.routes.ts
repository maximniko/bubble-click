import {Routes} from '@angular/router';

const ROUTE_PARTS = {
  bubbleClick: 'bubble-click',
  main: 'main',
  balance: 'balance',
  boost: 'boost',
  transfer: 'transfer',
  withdraw: 'withdraw',
  deposit: 'deposit',
}
export const routeCreator = {
  main: () => `/${ROUTE_PARTS.bubbleClick}/${ROUTE_PARTS.main}`,
  balance: () => `/${ROUTE_PARTS.bubbleClick}/${ROUTE_PARTS.balance}`,
  boost: () => `/${ROUTE_PARTS.bubbleClick}/${ROUTE_PARTS.boost}`,
  transfer: () => `/${ROUTE_PARTS.bubbleClick}/${ROUTE_PARTS.transfer}`,
  withdraw: () => `/${ROUTE_PARTS.bubbleClick}/${ROUTE_PARTS.withdraw}`,
  deposit: () => `/${ROUTE_PARTS.bubbleClick}/${ROUTE_PARTS.deposit}`,
  depositAdd: () => `/${ROUTE_PARTS.bubbleClick}/${ROUTE_PARTS.deposit}-add`,
}

export const bubbleClickRoutes: Routes = [
  {
    path: ROUTE_PARTS.bubbleClick,
    loadComponent: () => import('./bubble-click.component').then(mod => mod.BubbleClickComponent),
    children: [
      {
        path: ROUTE_PARTS.main,
        loadComponent: () => import('./components/main/main.component').then(mod => mod.MainComponent)
      },
      {
        path: ROUTE_PARTS.boost,
        loadComponent: () => import('./components/boost/turbo.component').then(mod => mod.TurboComponent)
      },
      {
        path: ROUTE_PARTS.balance,
        loadComponent: () => import('./components/balance/balance.component').then(mod => mod.BalanceComponent),
      },
      {
        path: ROUTE_PARTS.withdraw,
        loadComponent: () => import('./components/balance/transfers/withdraw/withdraw.component').then(mod => mod.WithdrawComponent)
      },
      {
        path: ROUTE_PARTS.transfer,
        loadComponent: () => import('./components/balance/transfers/transfer/transfer.component').then(mod => mod.TransferComponent)
      },
      {
        path: ROUTE_PARTS.deposit,
        loadComponent: () => import('./components/balance/transfers/deposit/deposit.component').then(mod => mod.DepositComponent)
      },
      {
        path: `${ROUTE_PARTS.deposit}-add`,
        loadComponent: () => import('./components/balance/transfers/deposit/deposit-add.component').then(mod => mod.DepositAddComponent)
      },
      {path: '**', redirectTo: routeCreator.main(), pathMatch: 'full'},
    ],
  },
  {path: '**', redirectTo: routeCreator.main(), pathMatch: 'full'},
]
