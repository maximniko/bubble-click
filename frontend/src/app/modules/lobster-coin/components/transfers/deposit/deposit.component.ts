import {CommonModule, Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Deposit, planToLabel} from '../../../domains/bank/interfaces/deposit.interface';
import {DepositService} from '../../../domains/bank/services/deposit/deposit.service';
import {toLocalDate} from '../../../../../common/extensions/Date';
import {TwaService} from '../../../../../common/services/twa.service';
import {RouterLink} from '@angular/router';
import {routeCreator} from '../../../lobster-coin.routes';
import {symbols} from '../../../../../common/components/symbols/symbols';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a class="btn btn-outline-primary" [routerLink]="routeCreator.bankDepositAdd()">add</a>
    @if (deposits.length > 0) {
      <ul class="list-group">
        @for (deposit of deposits; track deposits) {
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <p>C {{ toLocalDate(deposit.fromDate, twa.getUserLanguageCode() ?? 'en') }} ({{ planToLabel(deposit.plan) }})</p>
            <span class="badge">
              <svg class="bi">
                <use [attr.xlink:href]="'#' + symbols.clockHistory"/>
              </svg>
            </span>
          </li>
        }
      </ul>
    }
    <button (click)="goBack()">back</button>
  `,
})
export class DepositComponent implements OnInit {
  deposits: Deposit[] = []

  constructor(
    private location: Location,
    private depositService: DepositService,
    protected twa: TwaService,
  ) {
  }

  ngOnInit() {
    this.deposits = this.depositService.deposits
  }

  goBack() {
    this.location.back()
  }
  protected readonly toLocalDate = toLocalDate;
  protected readonly routeCreator = routeCreator;
  protected readonly planToLabel = planToLabel;
  protected readonly symbols = symbols;
}
