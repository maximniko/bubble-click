import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TwaService} from "../../../../common/services/twa.service";
import {symbols} from '../../../../common/components/symbols/symbols';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="accent-border accent-border-top accent-bg-shadow rounded-5 tg-bg-secondary h-100">
      <div class="hstack p-3 pb-0 color-accent">
        <span class="m-auto text-center h5">Турбо</span>
      </div>
      <div class="overflow-auto" style="max-height: calc(var(--tg-viewport-stable-height, 200) * 0.7)">
        <ul class="list-group m-2 my-3 tg-bg-secondary">
          @for (boost of boosts; track boost.level) {
            <li class="list-group-item vstack">
              <div class="jcb">
                <h3 class="color-header-text h3">Уровень {{ boost.level }}</h3>
                <div><span class="color-accent h3">{{ boost.perClick }}</span> за клик</div>
              </div>
              <div class="jcb gap-2 text-center">
                <div class="vstack jcc">
                  <div class="color-accent">
                    <svg class="bi">
                      <use [attr.xlink:href]="'#' + symbols.starFill"/>
                    </svg>
                    {{ boost.stars.now }}
                  </div>
                  <button class="btn tg-btn">получить за звезды</button>
                </div>
                <div class="vstack jcc">
                  <div class="color-accent">
                    <svg class="bi">
                      <use [attr.xlink:href]="'#' + symbols.coin"/>
                    </svg>
                    {{ boost.coins.now }}
                  </div>
                  <button class="btn tg-btn">получить за монеты</button>
                </div>
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  host: {class: 'd-flex flex-column h-100'},
})
export class BoostComponent {
  constructor(
    protected twa: TwaService,
  ) {
  }

  readonly boosts: Boost[] = [...Array(10).keys()].map<Boost>((i: number) => {
    const id = i + 1
    return {
      level: id,
      perClick: i + 2,
      stars: {now: id * 5 * (id)},
      coins: {now: id * 100_000 * (id)},
    }
  })

  protected readonly symbols = symbols;
}

interface Boost {
  level: number
  perClick: number
  stars: Price
  coins: Price
}

interface Price {
  now: number
  old?: number
}
