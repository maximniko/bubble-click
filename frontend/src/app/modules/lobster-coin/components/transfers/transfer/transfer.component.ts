import {CommonModule, Location} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControlStatus, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SumInputComponent} from '../_inputs/sum/sum-input.component';
import {ReactiveForm} from '../../../../../common/components/reactive-form.component';
import {Subscription} from 'rxjs';
import {TwaService} from '../../../../../common/services/twa.service';
import {BankService} from '../../../domains/bank/services/bank/bank.service';
import {CoinsService} from '../../../domains/coins/services/coins.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, SumInputComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <sum-input [parentForm]="form" [max]="maxSum"></sum-input>
    </form>
    <button (click)="goBack()">back</button>
  `,
})
export class TransferComponent extends ReactiveForm implements OnInit, OnDestroy {
  protected form: FormGroup
  protected formSubscription?: Subscription
  protected maxSum: number

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private twa: TwaService,
    private bankService: BankService,
    private coinsService: CoinsService,
  ) {
    super()
    this.maxSum = this.coinsService.balance
    this.form = this.formBuilder.group({})
  }

  ngOnInit() {
    this.formSubscription = this.form.statusChanges
      .subscribe((status: FormControlStatus) => this.twa.mainButtonIsActive(status == "VALID"))
    this.twa.backButtonOnClick(() => this.goBack())
    this.twa.setMainButton({text: 'Add', is_active: true, is_visible: true}, () => this.transfer())
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe()
    this.twa.mainButtonIsActive(true)
    this.twa.offBackButton(() => this.goBack())
    this.twa.offMainButton(() => this.transfer())
  }

  transfer() {
    if (this.form.invalid) {
      return
    }

    this.twa.mainButtonIsActive(false)
    this.coinsService.loadBalance()

    const timer = 500

    setTimeout(() => {
      const form: { sum: number } = this.form.value,
        balance = this.coinsService.balance

      if (form.sum > balance) {
        this.twa.showAlert('Error balance')
        this.goBack()
      }

      this.coinsService.balance = balance - form.sum
      this.bankService.balance = this.bankService.balance + form.sum
      setTimeout(() => this.goBack(), timer)
    }, timer * 2)
  }

  goBack() {
    this.location.back()
  }
}
