import {CommonModule, Location} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {DepositService} from '../../../domains/bank/services/deposit/deposit.service';
import {FormBuilder, FormControlStatus, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ReactiveForm} from '../../../../../common/components/reactive-form.component';
import {Deposit} from '../../../domains/bank/interfaces/deposit.interface';
import {TwaService} from '../../../../../common/services/twa.service';
import {DepositInputsComponent} from './_inputs/deposit-inputs.component';
import {Subscription} from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DepositInputsComponent],
  template: `
    <form [formGroup]="form">
      <deposit-inputs [parentForm]="form"></deposit-inputs>
    </form>
    <button (click)="goBack()">back</button>
  `,
})
export class DepositAddComponent extends ReactiveForm implements OnInit, OnDestroy {
  protected form: FormGroup
  protected formSubscription?: Subscription

  constructor(
    private location: Location,
    private depositService: DepositService,
    private formBuilder: FormBuilder,
    private twa: TwaService,
  ) {
    super()
    this.form = this.formBuilder.group({})
  }

  ngOnInit() {
    this.formSubscription = this.form.statusChanges
      .subscribe((status: FormControlStatus) => this.twa.mainButtonIsActive(status == "VALID"))
    this.twa.backButtonOnClick(() => this.goBack())
    this.twa.setMainButton({text: 'Add', is_active: true, is_visible: true}, () => this.add())
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe()
    this.twa.offBackButton(() => this.goBack())
    this.twa.offMainButton(() => this.add())
  }

  add() {
    if (this.form.invalid) {
      return
    }

    const deposits = this.depositService.deposits
    deposits.push(this.form.value as Deposit)

    if (!this.depositService.canSave(deposits)) {
      this.twa.showAlert('Too many deposits.')
      return;
    }

    this.depositService.deposits = deposits
  }

  goBack() {
    this.location.back()
  }
}
