export interface TurboInterface {
  loadTurbos(): void
  saveTurbos(turbos: Turbo[]): void
}

export interface Turbo {
  level: number
  perClick: number
  coins: Price
}

export interface Price {
  now: number
  old?: number
}

export const TURBO_ITEMS: Turbo[] = [...Array(10).keys()].map<Turbo>((i: number) => {
  const id = i + 1
  return {
    level: id,
    perClick: i + 2,
    coins: {now: id * 100_000 * (id)},
  }
})
