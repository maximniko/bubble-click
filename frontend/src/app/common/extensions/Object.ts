export function ifEmpty(val: object): boolean {
  return Object.keys(val).length == 0
}
