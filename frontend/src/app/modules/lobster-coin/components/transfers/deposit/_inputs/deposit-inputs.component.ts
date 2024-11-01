import {ReactiveForm} from '../../../../../../common/components/reactive-form.component';
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
import {DEPOSIT_PLANS, DepositPlan, planToLabel} from '../../../../domains/bank/interfaces/deposit.interface';
import {SumInputComponent} from '../../_inputs/sum/sum-input.component';
import {BankService} from '../../../../domains/bank/services/bank/bank.service';

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
      <label for="form-plan">{{ localisation.t.Plan ?? 'Plan' }}</label>
      <div class="invalid-feedback" *ngIf="isInvalidPlan">
        {{ validationErrors(planErrors, localisation.t.Plan ?? 'Plan') }}
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
    private bankService: BankService,
  ) {
    super();
    this.maxSum = this.bankService.balance
  }

  protected comparePlan(a?: DepositPlan, b?: DepositPlan): boolean {
    if (a && b) {
      return a.id == b.id
    }
    return false
  }

  ngOnInit() {
    this.parentForm.addControl('plan', this.formBuilder.control('', [Validators.required]))
    this.parentForm.addControl('fromDate', this.formBuilder.control(new Date(), [Validators.required]))
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

  protected readonly planToLabel = planToLabel;
  protected readonly planList = DEPOSIT_PLANS;
}
