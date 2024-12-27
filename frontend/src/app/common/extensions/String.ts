import {environment} from '../../../environments/environment';

export function jsonParse<T>(str: string): T | undefined {
  try {
    return JSON.parse(str);
  } catch {
    return undefined;
  }
}

export function makeSrc(path: string): string {
  if (environment.production) {
    return `/bubble-click${path}`
  }
  return path
}
