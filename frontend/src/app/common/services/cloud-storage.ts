import {Injectable} from '@angular/core';
import {TwaService} from './twa.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CloudStorage {
  constructor(private readonly twa: TwaService) {
  }

  /**
   * Bot API 6.9+ A method that stores a value in the cloud storage using the specified key.
   * The key should contain 1-128 characters, only A-Z, a-z, 0-9, _ and - are allowed.
   * The value should contain 0-4096 characters. You can store up to 1024 keys in the cloud storage.
   */
  setItem(key: string, value: string) {
    return new Observable<boolean>(subscriber => {
      this.twa.cloudStorage.setItem(key, value, (error, success) => {
        if (error) {
          subscriber.error(error);
          return;
        }

        subscriber.next(success);
        subscriber.complete();
      });
    });
  }

  /** The key should contain 1-128 characters, only A-Z, a-z, 0-9, _ and - are allowed. */
  getItem(key: string) {
    return new Observable<string | undefined>(subscriber => {
      this.twa.cloudStorage.getItem(key, (error, value) => {
        if (error) {
          subscriber.error(error);
          return;
        }

        subscriber.next(value);
        subscriber.complete();
      });
    })
  }

  /** The keys should contain 1-128 characters, only A-Z, a-z, 0-9, _ and - are allowed. */
  getItems<T extends string>(keys: T[]) {
    return new Observable<CloudStorageItems>(subscriber => {
      this.twa.cloudStorage.getItems(keys, (error, values?: CloudStorageItems) => {
        if (error) {
          subscriber.error(error);
          return;
        }

        subscriber.next(values);
        subscriber.complete();
      });
    })
  }

  /** The key should contain 1-128 characters, only A-Z, a-z, 0-9, _ and - are allowed. */
  removeItem(key: string) {
    return new Observable<boolean>(subscriber => {
      this.twa.cloudStorage.removeItem(key, (error, success) => {
        if (error) {
          subscriber.error(error);
          return;
        }

        subscriber.next(success);
        subscriber.complete();
      });
    });
  }

  /** The keys should contain 1-128 characters, only A-Z, a-z, 0-9, _ and - are allowed. */
  removeItems(keys: string[]) {
    return new Observable<boolean>(subscriber => {
      this.twa.cloudStorage.removeItems(keys, (error, success) => {
        if (error) {
          subscriber.error(error);
          return;
        }

        subscriber.next(success);
        subscriber.complete();
      });
    });
  }

  getKeys() {
    return new Observable<string[]>(subscriber => {
      this.twa.cloudStorage.getKeys((error, keys) => {
        if (error) {
          subscriber.error(error);
          return;
        }

        subscriber.next(keys);
        subscriber.complete();
      });
    });
  }
}

type CloudStorageKey = string;
type CloudStorageValue = string;

interface CloudStorageItems {
  [key: CloudStorageKey]: CloudStorageValue;
}
