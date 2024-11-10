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
    const rotation1 = Math.random() * 50 - 25; // Вращение от -20 до 20 градусов
    const rotation2 = Math.random() * 50 - 25; // Вращение от -20 до 20 градусов

    // Создаем ключевые кадры для анимации
    const keyframes = `
      @keyframes ${animationName} {
        0% {
          opacity: 1;
          offset-rotate: ${rotation1}deg;
          offset-distance: 0%;
        }
        100% {
          opacity: 0;
          offset-distance: 100%;
          offset-rotate: ${rotation2}deg;
          transform: scale(1.2);
        }
      }
    `;

    const styleSheet = document.styleSheets[0] as CSSStyleSheet;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    this.renderer.setStyle(element, 'animation', `${animationName} 1.5s infinite ease-in-out`);
    this.renderer.setStyle(element, 'offset-path', this.generateRandomPath());
  }

  generateRandomPath(): string {
    const control1X = Math.random() * 100 - 50 // Случайное смещение влево и вправо
    const control2X = Math.random() * 100 - 50
    const control1Y = -Math.random() * 100 // Подъем вверх
    const control2Y = -Math.random() * 200
    const endX = Math.random() * 50 - 25
    const endY = -150; // Максимальная высота траектории

    // Генерация траектории: M - начальная точка, C - кривая Безье
    return `path("M 0 0 C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY}")`;
  }
}
