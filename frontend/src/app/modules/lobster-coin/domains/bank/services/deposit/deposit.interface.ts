import {Deposit} from '../../interfaces/deposit.interface';

export interface DepositInterface {
  canSave(deposits: Deposit[]): boolean;
  get deposits(): Deposit[]
  set deposits(deposits: Deposit[])
}
