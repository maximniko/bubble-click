import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoinsService} from '../../../domains/coins/services/coins.service';
import {FormsModule} from '@angular/forms';
import {getRandomInt} from '../../../../../common/extensions/Number';

@Component({
  selector: 'main-coin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: 'coin.component.scss',
  template: `
    <div class="clicker-container" (click)="onClick($event)" (mousemove)="log($event)"
         style="width:14rem;height:14rem;background-color:red;">
      @for (click of clicks; track click.id) {
        <div class="click" [ngStyle]="{'top.px': click.top, 'left.px': click.left}">
          {{ coinsService.perClick }}
        </div>
      }
    </div>
    <input [(ngModel)]="coinsService.perClick" type="number" min="1">
  `,
  host: {class: 'm-auto'},
})
export class CoinComponent {
  clicks: Click[] = [];
  private clickCounter = 0;

  public mousePosition: string = "Hover over test element to get mouse position";
  public log(event: any) {
    this.mousePosition = `Mouse X: ${event.x},  Mouse Y: ${event.y}`;
  }

  constructor(
    protected coinsService: CoinsService,
  ) {
  }

  // Обрабатываем событие клика и передаем в Subject
  onClick(event: MouseEvent) {
    // Генерируем случайные значения для поворота
    const rotation = Math.random() * 360 - 180; // Рандомное вращение от -180 до 180

    // Создаем новый объект клика с координатами
    const newClick = {
      id: this.clickCounter++,
      top: event.clientY,   // Координата Y клика
      left: event.clientX,  // Координата X клика
      rotation
    };

    this.clicks.push(newClick);

    this.coinsService.onClick()

    // Удаляем элемент через 1.5 секунды после анимации
    setTimeout(() => {
      this.clicks = this.clicks.filter(click => click.id !== newClick.id);
    }, 1500);
  }

  protected readonly getRandomInt = getRandomInt;
}

interface Click {
  id: number,
  top: number,
  left: number,
  rotation: number
}
