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

export function planToLabel(plan: DepositPlan): string {
  return `${plan.percents}% per ${plan.days} days`
}
