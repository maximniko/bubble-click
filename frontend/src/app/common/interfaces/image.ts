export interface Image {
  src: string
  alt: string
}

export function imageGenerator(width: number, height: number): Image {
  return {
    src: `http://via.placeholder.com/${width}x${height}/`,
    alt: `Image ${width}x${height}`,
  }
}
