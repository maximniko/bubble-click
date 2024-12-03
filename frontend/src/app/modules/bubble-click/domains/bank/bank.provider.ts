import {EnvironmentProviders, Provider} from '@angular/core';
import {BankService} from './services/bank/bank.service';
import {environment} from '../../../../../environments/environment';
import {BankDevService} from './services/bank/bank-dev.service';
import {DepositService} from './services/deposit/deposit.service';
import {DepositDevService} from './services/deposit/deposit-dev.service';

export const bankProviders: Array<Provider | EnvironmentProviders> = [
  {provide: BankService, useClass: environment.production ? BankService : BankDevService},
  {provide: DepositService, useClass: environment.production ? DepositService : DepositDevService},
]
