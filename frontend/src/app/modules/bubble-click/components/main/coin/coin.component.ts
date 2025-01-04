import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoinsService} from '../../../domains/coins/services/coins/coins.service';
import {FormsModule} from '@angular/forms';
import {ClickAnimationDirective} from './click-animation.directive';
import {debounceTime, scan, startWith, Subject, Subscription, switchMap, tap} from 'rxjs';
import {fromSubscribable} from 'rxjs/internal/observable/fromSubscribable';
import {ClickSoundDirective} from './click-sound.directive';
import {CoinPressDirective} from './coin-press.directive';
import {TurboService} from '../../../domains/coins/services/turbo/turbo.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {makeSrc} from '../../../../../common/extensions/String';

@Component({
  selector: 'main-coin',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickAnimationDirective, CoinPressDirective, ClickSoundDirective],
  styleUrl: 'coin.component.scss',
  template: `
    <div class="m-auto">
      @if (deviceDetector.isDesktop()) {
        <img src="{{ bubbleSrc() }}"
             style="width:17rem;height:17rem;border-radius:50%;"
             (click)="onClick($event)"
             coinPress
             alt="bubble">
      } @else {
        <img src="{{ bubbleSrc() }}"
             style="width:17rem;height:17rem;border-radius:50%;"
             (touchend)="onTouch($event)"
             coinPress
             alt="bubble">
      }
      @for (click of clicks; track click.id) {
        <div class="click color-accent"
             [appClickAnimation]="click.id"
             [appClickSound]="{sound: click.id}"
             [ngStyle]="{'top.px': click.top, 'left.px': click.left}">
          {{ turboService.perClickSubject | async }}
        </div>
      }
    </div>
  `,
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
    protected deviceDetector: DeviceDetectorService,
    protected turboService: TurboService,
  ) {
  }

  bubbleSrc(): string {
    return makeSrc('/assets/bubbles/bubble.svg')
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

  onTouch(event: TouchEvent) {
    for (let i = 0; i < event.changedTouches.length; i++) {
      this.onClick(event.changedTouches[i])
    }
  }

  onClick(event: MouseEvent|Touch) {
    // Генерируем случайные значения для поворота
    this.click(event.clientX, event.clientY)
  }

  private click(clientX: number, clientY: number) {
    // Генерируем случайные значения для поворота
    let rotation: number = Math.random() * 360 - 180

    // Создаем новый объект клика с координатами
    const newClick = {
      id: this.clickCounter++,
      top: clientY,   // Координата Y клика
      left: clientX,  // Координата X клика
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

interface Click {
  id: number,
  top: number,
  left: number,
  rotation: number,
}
