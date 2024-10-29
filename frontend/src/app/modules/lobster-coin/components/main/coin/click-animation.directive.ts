import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appClickAnimation]',
})
export class ClickAnimationDirective implements OnInit {

  @Input() appClickAnimation: number = 1;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.addAnimation();
  }

  addAnimation() {
    const element = this.el.nativeElement;

    // Создаем уникальное имя для анимации на основе номера
    const animationName = `bubbleMove-${this.appClickAnimation}-${Date.now()}`;

    // Генерируем случайные значения для движения и вращения
    const randomX1 = Math.random() * 50 - 25; // Смещение по X от -25 до 25
    const randomY1 = Math.random() * 50; // Смещение по Y от 0 до 50
    const randomX2 = Math.random() * 25 - 25;
    const randomY2 = Math.random() * 25;
    const rotation1 = Math.random() * 40 - 20; // Вращение от -20 до 20 градусов
    const rotation2 = Math.random() * 40 - 20;

    // Создаем ключевые кадры для анимации
    const keyframes = `
      @keyframes ${animationName} {
        0% {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }
        35% {
          transform: translate(${randomX1}px, ${randomY1}px) rotate(${rotation1}deg) scale(1.1);
        }
        75% {
          transform: translate(${randomX2}px, ${randomY2}px) rotate(${rotation2}deg) scale(1.1);
        }
        100% {
          opacity: 0;
          transform: translate(${randomX1}px, -120px) rotate(-30deg) scale(1.2);
        }
      }
    `;

    const styleSheet = document.styleSheets[0] as CSSStyleSheet;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    this.renderer.setStyle(element, 'animation', `${animationName} 1.5s ease-out forwards`);
  }
}
