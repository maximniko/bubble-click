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
      <div class="navbar-nav flex-row m-2 bg-blur">
        <a class="nav-link w-100" [routerLink]="routeCreator.main()">
          <svg class="bi">
            <use [attr.xlink:href]="'#' + symbols.coin"/>
          </svg>
          Main
        </a>
        <a class="nav-link w-100" [routerLink]="routeCreator.balance()">
          <svg class="bi">
            <use [attr.xlink:href]="'#' + symbols.currencyExchange"/>
          </svg>
          Balance
        </a>
      </div>
    </footer>
  `,
  host: {'class': 'footer'}
})
export class FooterComponent {
  protected readonly routeCreator = routeCreator;
  protected readonly symbols = symbols;
}
