import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[coinPress]',
})
export class CoinPressDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('touchstart', ['$event']) onMouseEnter(event: TouchEvent) {
    const coinElement = this.el.nativeElement;
    const rect = coinElement.getBoundingClientRect();

    // Получаем координаты всех точек касания и вычисляем среднее значение
    const {averageX, averageY} = this.getAverageTouchPoint(event);

    // Координаты центра монеты
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Вычисляем смещение касания относительно центра
    const offsetX = centerX - averageX;
    const offsetY = centerY - averageY;
    const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);
    const maxDistance = Math.min(rect.width, rect.height) / 2;
    const animationName = `clickCenter-${Date.now()}`;
    let keyframes: string

    // Если касание ближе к центру, уменьшаем монету
    if (distance / maxDistance < 0.3) {
      keyframes = `
      @keyframes ${animationName} {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); }
        100% { transform: scale(1); }
      }
    `;
    } else {
      // Если касание на краю, наклоняем монету в сторону касания
      // const rotateX = (offsetY / rect.height) * -30; // Наклон по оси X
      // const rotateY = (offsetX / rect.width) * 30;   // Наклон по оси Y

      const x = offsetY / maxDistance
      const y = -(offsetX / maxDistance)
      const originX = centerX + offsetX
      const originY = centerY + offsetY
      const deg = 20 * Math.max(Math.abs(x), Math.abs(y))
      // console.log(`rotate x ${x}, y ${y}`)
      // console.log(`transform-origin: ${originX}px ${originY}px`)
      // console.log(`deg: ${deg}`)
      keyframes = `
      @keyframes ${animationName} {
        0% {
          transform: rotate3d(${x}, ${y}, 0, ${deg}deg);
          transform-origin: ${originX}px ${originY}px;
        }
        50% { transform: rotate3d(${x / 2}, ${y / 2}, 0, ${deg / 2}deg); }
        100% { transform: rotate3d(0, 0, 0, 0deg); }
      }
    `;
    }
    const styleSheet = document.styleSheets[0] as CSSStyleSheet;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    this.renderer.setStyle(coinElement, 'animation', `${animationName} 0.7s ease-out forwards`);
  }

  @HostListener('touchend', ['$event']) onTouchEnd(event: TouchEvent) {
    // Удаляем предыдущие стили
    const coinElement = this.el.nativeElement;
    this.renderer.removeClass(coinElement, 'press-center');
    this.renderer.removeClass(coinElement, 'press-edge');
  }

  // Метод для вычисления среднего положения при нескольких касаниях
  private getAverageTouchPoint(event: TouchEvent) {
    let totalX = 0;
    let totalY = 0;
    const length = event.touches.length

    for (let i = 0; i < length; i++) {
      totalX += event.touches[i].clientX;
      totalY += event.touches[i].clientY;
    }

    const averageX = totalX / length;
    const averageY = totalY / length;

    return {averageX, averageY};
  }
}
