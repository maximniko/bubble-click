import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CoinsService} from '../../../domains/coins/services/coins/coins.service';
import {FormsModule} from '@angular/forms';
import {ClickAnimationDirective} from './click-animation.directive';
import {debounceTime, scan, startWith, Subject, Subscription, switchMap, tap} from 'rxjs';
import {fromSubscribable} from 'rxjs/internal/observable/fromSubscribable';
import {ClickSoundDirective} from './click-sound.directive';
import {CoinPressDirective} from './coin-press.directive';
import {TurboService} from '../../../domains/coins/services/turbo/turbo.service';

@Component({
  selector: 'main-coin',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickAnimationDirective, CoinPressDirective, ClickSoundDirective, NgOptimizedImage],
  styleUrl: 'coin.component.scss',
  template: `
    <img ngSrc="assets/bubbles/bubble.svg"
         style="width:16rem;height:16rem;border-radius:50%;"
         (touchend)="onClick($event)"
         coinPress
         alt="bubble"
         height="146" width="144">
    @for (click of clicks; track click.id) {
      <div class="click color-accent"
           [appClickAnimation]="click.id"
           [appClickSound]="{sound: click.id}"
           [ngStyle]="{'top.px': click.top, 'left.px': click.left}">
        {{ turboService.perClickSubject | async }}
      </div>
    }
  `,
  host: {class: 'm-auto'},
})
export class CoinComponent implements OnInit, OnDestroy {
  clicks: Click[] = [];
  private clickCounter = 0;
  private perClick = 1;
  private trigger$ = new Subject<void>();
  private clickSubject = new Subject<void>();
  protected triggerSubscription?: Subscription
  protected turboSubscription?: Subscription

  constructor(
    protected coinsService: CoinsService,
    protected turboService: TurboService,
  ) {
  }

  ngOnInit() {
    this.triggerSubscription = this.trigger$
      .pipe(
        startWith(void 0),
        switchMap(() => fromSubscribable(this.clickSubject).pipe(scan((acc) => acc + 1, 0))),
        debounceTime(500),
        tap(() => this.trigger$.next()),
      )
      .subscribe(clicks => this.coinsService.saveClicks(clicks * this.perClick))
    this.turboSubscription = this.turboService.perClickSubject
      .subscribe((value) => this.perClick = value)
  }

  ngOnDestroy() {
    this.triggerSubscription?.unsubscribe()
    this.turboSubscription?.unsubscribe()
  }

  // Обрабатываем событие клика и передаем в Subject
  onClick(event: TouchEvent) {
    // Генерируем случайные значения для поворота

    for (let i = 0; i < event.changedTouches.length; i++) {
      let touch: Touch = event.changedTouches[i]
      let rotation: number = Math.random() * 360 - 180
      // Создаем новый объект клика с координатами
      const newClick = {
        id: this.clickCounter++,
        top: touch.clientY,   // Координата Y клика
        left: touch.clientX,  // Координата X клика
        rotation
      };

      this.clicks.push(newClick);

      this.clickSubject.next()

      // Удаляем элемент через 1.5 секунды после анимации
      setTimeout(() => {
        this.clicks = this.clicks.filter(click => click.id !== newClick.id);
      }, 1500);
    }
  }
}

interface Click {
  id: number,
  top: number,
  left: number,
  rotation: number,
}
