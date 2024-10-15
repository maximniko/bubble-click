export function groupBy<T>(arr: T[], size: number): T[][] {
  return arr.reduce((acc: T[][], curr: T, index: number) => {
    if (index % size === 0) {
      acc.push([curr]);
    } else {
      acc[acc.length - 1].push(curr);
    }
    return acc;
  }, []) as T[][];
}
