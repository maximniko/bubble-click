import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TwaService} from "../../../../common/services/twa.service";
import {symbols} from '../../../../common/components/symbols/symbols';
import {CoinsService} from '../../domains/coins/services/coins/coins.service';
import {Subscription} from 'rxjs';
import {Turbo, TURBO_ITEMS} from '../../domains/coins/services/turbo/turbo.interface';
import {TurboService} from '../../domains/coins/services/turbo/turbo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="accent-border accent-border-top accent-bg-shadow rounded-5 tg-bg-secondary h-100">
      <div class="hstack p-3 color-accent">
        <span class="m-auto text-center h5">
          <svg class="bi">
            <use [attr.xlink:href]="'#' + symbols.rocketTakeoff"/>
          </svg>
          Турбо
        </span>
      </div>
      <div class="overflow-auto" style="max-height: calc(var(--tg-viewport-stable-height, 200) * 0.7)">
        <ul class="list-group m-2 my-3 tg-bg-secondary">
          @for (turbo of turbos; track turbo.level) {
            @let isBought = this.bought(turbo);
            <li class="list-group-item vstack" [ngClass]="{
                'bg-success-subtle': isBought
            }">
              <div class="jcb">
                <h3 class="h3">Уровень {{ turbo.level }}</h3>
                <div><span class="color-accent h3">{{ turbo.perClick }}</span> за клик</div>
              </div>
              <div class="jcb gap-2 text-center">
                <div class="color-accent my-2 h4">
                  <svg class="bi">
                    <use [attr.xlink:href]="'#' + symbols.coin"/>
                  </svg>
                  {{ turbo.coins.now }}
                </div>
                @if (isBought) {
                  <span class="btn btn-success disabled">Получено</span>
                } @else {
                  <button class="btn tg-btn" [ngClass]="{
                    'disabled': !canBuy(turbo)
                  }" (click)="confirmByCoin(turbo)">Получить</button>
                }
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  host: {class: 'd-flex flex-column h-100'},
})
export class TurboComponent implements OnInit, OnDestroy {
  protected coinsSubscription?: Subscription
  protected turboSubscription?: Subscription
  protected maxSum: number = 0
  protected boughtTurbo: Turbo[] = []
  turbo?: Turbo

  constructor(
    protected twa: TwaService,
    protected coinsService: CoinsService,
    protected turboService: TurboService,
  ) {
  }

  ngOnInit() {
    this.coinsSubscription = this.coinsService.balanceSubject.subscribe({
      next: (value) => {
        this.maxSum = value
        this.onNextBalance(value)
      },
      error: (e) => this.twa.showAlert((<Error>e).message)
    })
    this.turboSubscription = this.turboService.turbosSubject
      .subscribe((value) => this.boughtTurbo = value)
  }

  ngOnDestroy(): void {
    this.coinsSubscription?.unsubscribe()
    this.turboSubscription?.unsubscribe()
  }

  protected bought(turbo: Turbo): boolean {
    return !!this.boughtTurbo.find((item) => item.level == turbo.level)
  }

  protected canBuy(turbo: Turbo): boolean {
    return (this.boughtTurbo.sort((a, b) => a.level > b.level ? -1 : 1)[0]?.level ?? 0) + 1 == turbo.level
    && this.maxSum > turbo.coins.now
  }

  confirmByCoin(boost: Turbo) {
    this.twa.showPopup({
      title: 'Купить турбо?',
      message: `Купить турбо ${boost.level} уровня за ${boost.level}?`,
      buttons: [
        {id: 'yes', type: 'default', text: 'Купить'},
        {type: 'cancel'},
      ]
    }, (btn) => {
      if (btn === 'yes') {
        this.byCoin(boost);
      }
    })
  }

  byCoin(boost: Turbo) {
    if (!this.canBuy(boost)) {
      return
    }

    this.turbo = boost
    this.coinsService.loadBalance()
  }

  private onNextBalance(balance: number) {
    const price = this.turbo?.coins.now

    if (!this.turbo || !price) {
      return;
    }

    if (balance < price) {
      this.twa.showAlert('Недостаточно монет.')
      return;
    }

    const turbos = Array.from(this.boughtTurbo)
    turbos.push(this.turbo)
    this.turbo = undefined

    try {
      this.coinsService.saveBalance(balance - price)
      this.turboService.saveTurbos(turbos)
    } catch (e) {
      this.twa.showAlert((<Error>e).message)
      this.coinsService.saveBalance(balance)
      this.turboService.saveTurbos(this.boughtTurbo)
    }
  }

  protected readonly symbols = symbols;
  protected readonly turbos = TURBO_ITEMS
}
