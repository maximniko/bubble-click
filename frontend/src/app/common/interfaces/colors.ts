export function getColor(id: number): string {
  return colors[id % colors.length]
}

const colors = [
  '#c91c11',
  '#c05826',
  '#dca29a',
  '#55cf84',
  "#b14184",
  '#b5a41b',
  '#31775c',
  '#d30c6c',
  '#b4ac7f',
  '#7147dc',
  '#ecdb7b',
]
