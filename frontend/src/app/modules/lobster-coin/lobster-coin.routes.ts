import {Routes} from '@angular/router';

const ROUTE_PARTS = {
  lobsterCoin: 'lobster-coin',
  main: 'main',
  bank: 'bank',
  transfer: 'transfer',
  withdraw: 'withdraw',
  deposit: 'deposit',
  friends: 'friends',
}
export const routeCreator = {
  main: () => `/${ROUTE_PARTS.lobsterCoin}/${ROUTE_PARTS.main}`,
  bank: () => `/${ROUTE_PARTS.lobsterCoin}/${ROUTE_PARTS.bank}`,
  bankTransfer: () => `/${ROUTE_PARTS.lobsterCoin}/${ROUTE_PARTS.bank}/${ROUTE_PARTS.transfer}`,
  bankWithdraw: () => `/${ROUTE_PARTS.lobsterCoin}/${ROUTE_PARTS.bank}/${ROUTE_PARTS.withdraw}`,
  bankDeposit: () => `/${ROUTE_PARTS.lobsterCoin}/${ROUTE_PARTS.bank}/${ROUTE_PARTS.deposit}`,
  bankDepositAdd: () => `/${ROUTE_PARTS.lobsterCoin}/${ROUTE_PARTS.bank}/${ROUTE_PARTS.deposit}-add`,
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
        path: `${ROUTE_PARTS.bank}`,
        loadComponent: () => import('./components/bank/bank.component').then(mod => mod.BankComponent),
        children: [
          {
            path: '',
            loadComponent: () => import('./components/bank/main/main.component').then(mod => mod.MainComponent)
          },
          {
            path: `${ROUTE_PARTS.withdraw}`,
            loadComponent: () => import('./components/bank/withdraw/withdraw.component').then(mod => mod.WithdrawComponent)
          },
          {
            path: `${ROUTE_PARTS.transfer}`,
            loadComponent: () => import('./components/bank/transfer/transfer.component').then(mod => mod.TransferComponent)
          },
          {
            path: `${ROUTE_PARTS.deposit}`,
            loadComponent: () => import('./components/bank/deposit/deposit.component').then(mod => mod.DepositComponent)
          },
          {
            path: `${ROUTE_PARTS.deposit}-add`,
            loadComponent: () => import('./components/bank/deposit/deposit-add.component').then(mod => mod.DepositAddComponent)
          },
        ]
      },
      {
        path: `${ROUTE_PARTS.friends}`,
        loadComponent: () => import('./components/friends/friends.component').then(mod => mod.FriendsComponent)
      },
    ],
  }
]
