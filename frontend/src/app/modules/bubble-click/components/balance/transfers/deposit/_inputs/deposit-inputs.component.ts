import {ReactiveForm} from '../../../../../../../common/components/reactive-form.component';
import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {DEPOSIT_PLANS, DepositPlan} from '../../../../../domains/bank/interfaces/deposit.interface';
import {SumInputComponent} from '../../_inputs/sum/sum-input.component';
import {CoinsService} from '../../../../../domains/coins/services/coins/coins.service';
import {sprintf} from 'sprintf-js';

@Component({
  selector: 'deposit-inputs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SumInputComponent],
  template: `
      <div class="form-floating mb-3">
          <select type="text" class="form-select" id="form-plan" formControlName="plan" [ngClass]="{
            'is-invalid': isInvalidPlan,
            'is-valid': parentForm.valid,
          }" [compareWith]="comparePlan">
              @for (plan of planList; track plan.id) {
                  <option [ngValue]="plan">{{ planToLabel(plan) }}</option>
              }
          </select>
          <label for="form-plan">{{ localisation.messages.Plan ?? 'Plan' }}</label>
          <div class="invalid-feedback" *ngIf="isInvalidPlan">
              {{ validationErrors(planErrors, localisation.messages.Plan ?? 'Plan') }}
          </div>
      </div>
      <sum-input [parentForm]="parentForm" [max]="maxSum"></sum-input>
  `,
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})
export class DepositInputsComponent extends ReactiveForm implements OnInit {
  @Input() parentForm!: FormGroup
  protected maxSum: number

  constructor(
    private formBuilder: FormBuilder,
    private coinsService: CoinsService,
  ) {
    super();
    this.maxSum = this.coinsService.balance
  }

  protected comparePlan(a?: DepositPlan, b?: DepositPlan): boolean {
    if (a && b) {
      return a.id == b.id
    }
    return false
  }

  ngOnInit() {
    this.parentForm.addControl('plan', this.formBuilder.control('', [Validators.required]))
  }

  private get plan() {
    return this.parentForm.get('plan');
  }

  get planErrors() {
    return this.errors(this.plan);
  }

  get isInvalidPlan(): boolean | undefined {
    return this.isInvalid(this.plan)
  }

  protected planToLabel(plan: DepositPlan): string {
    return sprintf(this.localisation.messages.planToLabel ?? '%d% per %d days', plan.percents, plan.days)
  }

  protected readonly planList = DEPOSIT_PLANS;
}
