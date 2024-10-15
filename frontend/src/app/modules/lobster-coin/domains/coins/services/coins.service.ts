import {Injectable} from '@angular/core';
import {debounceTime, scan, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CoinsService {
  private clickSubject = new Subject<void>();
  totalClicks: number = 0;
  perClick: number = 1;

  constructor() {
    this.clickSubject
      .pipe(
        // Суммируем клики
        scan((acc) => acc + this.perClick, 0),
        // Ожидаем 500мс после последнего клика
        debounceTime(500)
      ).subscribe(clickCount => {
      this.totalClicks = clickCount;
      this.sendClicks(clickCount);
    });
  }

  onClick() {
    // Добавляем событие в поток при каждом клике
    console.log('onClick')
    this.clickSubject.next();
  }

  sendClicks(clickCount: number) {
    // Здесь можно реализовать логику отправки события
    console.log(`Отправлено ${clickCount} кликов`);
  }
}
