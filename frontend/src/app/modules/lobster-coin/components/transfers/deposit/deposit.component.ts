import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {planToLabel} from '../../../domains/bank/interfaces/deposit.interface';
import {DepositService} from '../../../domains/bank/services/deposit/deposit.service';
import {toLocalDate} from '../../../../../common/extensions/Date';
import {TwaService} from '../../../../../common/services/twa.service';
import {Router, RouterLink} from '@angular/router';
import {routeCreator} from '../../../lobster-coin.routes';
import {symbols} from '../../../../../common/components/symbols/symbols';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="m-2">
      <h5 class="h5">Deposits</h5>
    </div>
    <div class="mb-2">
      @if (depositService.depositsSubject| async; as deposits) {
        <ul class="list-group">
          @for (deposit of deposits; track deposit) {
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
      } @else {
        <p>No deposits yet.</p>
      }
    </div>
  `,
})
export class DepositComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    protected depositService: DepositService,
    protected twa: TwaService,
  ) {
  }

  ngOnInit() {
    this.twa.setMainButton({text: 'Add Deposit', is_active: true, is_visible: true}, () => this.add())
    this.twa.backButtonOnClick(() => this.goBack())
  }

  ngOnDestroy() {
    this.twa.offBackButton(() => this.goBack())
    this.twa.offMainButton(() => this.add())
  }

  goBack() {
    this.router.navigate([routeCreator.bank()])
  }

  add() {
    this.router.navigate([routeCreator.bankDepositAdd()])
  }

  protected readonly toLocalDate = toLocalDate;
  protected readonly planToLabel = planToLabel;
  protected readonly symbols = symbols;
}
