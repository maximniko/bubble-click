import {daysDiff} from '../../../../../common/extensions/Date';

export interface Deposit {
  plan: DepositPlan
  fromDate: Date
  sum: number
}

export interface DepositPlan {
  id: number
  days: number
  percents: number
}

export const DEPOSIT_PLANS: DepositPlan[] = [
  {
    id: 1,
    days: 1,
    percents: 1,
  },
  {
    id: 2,
    days: 3,
    percents: 4,
  },
  {
    id: 3,
    days: 6,
    percents: 9,
  },
  {
    id: 4,
    days: 9,
    percents: 14,
  },
  {
    id: 5,
    days: 12,
    percents: 23,
  },
  {
    id: 6,
    days: 18,
    percents: 33,
  },
]

export function depositToCoefficient(deposit: Deposit): number {
  return daysDiff(deposit.fromDate, new Date()) / deposit.plan.days
}

export function depositToBonus(deposit: Deposit): number {
  const coefficient = depositToCoefficient(deposit),
    profit = (deposit.sum * deposit.plan.percents / 100)

  return Math.ceil(coefficient * profit)
}

export function depositToDate(deposit: Deposit): Date {
  return new Date(deposit.fromDate.getTime() + (deposit.plan.days * 24 * 3600 * 1000))
}
