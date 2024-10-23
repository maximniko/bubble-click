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
import {DateInputComponent} from './date-input.component';
import {CoinsService} from '../../../../domains/coins/services/coins.service';
import {DEPOSIT_PLANS, DepositPlan, planToLabel} from '../../../../domains/bank/interfaces/deposit.interface';

@Component({
  selector: 'deposit-inputs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DateInputComponent],
  templateUrl: './deposit-inputs.component.html',
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})
export class DepositInputsComponent extends ReactiveForm implements OnInit {
  @Input() parentForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private coinsService: CoinsService,
  ) {
    super();
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
    this.parentForm.addControl('sum', this.formBuilder.control(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(this.coinsService.balance),
    ]))
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

  private get sum() {
    return this.parentForm.get('sum');
  }

  get sumErrors() {
    return this.errors(this.sum);
  }

  get isInvalidSum(): boolean | undefined {
    return this.isInvalid(this.sum)
  }

  protected readonly planToLabel = planToLabel;
  protected readonly planList = DEPOSIT_PLANS;
}
