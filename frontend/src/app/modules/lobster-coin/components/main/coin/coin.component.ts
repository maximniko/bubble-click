import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoinsService} from '../../../domains/coins/services/coins.service';
import {FormsModule} from '@angular/forms';
import {ClickAnimationDirective} from './click-animation.directive';

@Component({
  selector: 'main-coin',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickAnimationDirective],
  styleUrl: 'coin.component.scss',
  template: `
    <div class="clicker-container" (touchend)="onClick($event)" style="width:14rem;height:14rem;background-color:red;">
      @for (click of clicks; track click.id) {
        <div class="click color-accent"
             [appClickAnimation]="click.id"
             [ngStyle]="{'top.px': click.top, 'left.px': click.left}">
          {{ coinsService.perClick }}
        </div>
      }
    </div>
  `,
  host: {class: 'm-auto'},
})
export class CoinComponent {
  clicks: Click[] = [];
  private clickCounter = 0;

  constructor(
    protected coinsService: CoinsService,
  ) {
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

      this.coinsService.onClick()

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
  rotation: number
}
