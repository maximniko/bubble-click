import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {planToLabel} from '../../../domains/bank/interfaces/deposit.interface';
import {DepositService} from '../../../domains/bank/services/deposit/deposit.service';
import {toLocalDate} from '../../../../../common/extensions/Date';
import {TwaService} from '../../../../../common/services/twa.service';
import {Router, RouterLink} from '@angular/router';
import {routeCreator} from '../../../lobster-coin.routes';
import {symbols} from '../../../../../common/components/symbols/symbols';
import {ReactiveFormsModule} from '@angular/forms';
import {SumInputComponent} from '../_inputs/sum/sum-input.component';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="accent-border accent-border-top accent-bg-shadow card rounded-5 h-100">
      <div class="hstack p-3 pb-0 color-accent">
        <span class="m-auto text-center h5">Deposits</span>
      </div>
      <div class="d-flex flex-column h-100 mb-5">
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
      </div>
    </section>
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
    this.router.navigate([routeCreator.balance()])
  }

  add() {
    this.router.navigate([routeCreator.depositAdd()])
  }

  protected readonly toLocalDate = toLocalDate;
  protected readonly planToLabel = planToLabel;
  protected readonly symbols = symbols;
}
