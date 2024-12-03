import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {routeCreator} from '../../../lobster-coin.routes';
import {symbols} from '../../../../../common/components/symbols/symbols';

@Component({
  selector: 'my-money-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer>
      <div class="navbar-nav flex-row m-2 tg-bg-secondary">
        <a class="nav-link w-100" [routerLink]="routeCreator.main()">
          <svg class="bi">
            <use [attr.xlink:href]="'#' + symbols.coin"/>
          </svg>
        </a>
        <a class="nav-link w-100" [routerLink]="routeCreator.boost()">
          <svg class="bi">
            <use [attr.xlink:href]="'#' + symbols.rocketTakeoff"/>
          </svg>
        </a>
        <a class="nav-link w-100" [routerLink]="routeCreator.balance()">
          <svg class="bi">
            <use [attr.xlink:href]="'#' + symbols.currencyExchange"/>
          </svg>
        </a>
      </div>
    </footer>
  `,
  host: {'class': 'footer sticky-bottom bg-blur'}
})
export class FooterComponent {
  protected readonly routeCreator = routeCreator;
  protected readonly symbols = symbols;
}
