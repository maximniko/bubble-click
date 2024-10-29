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
      <div class="mx-2 my-4">
        @if(coinsService.balanceSubject | async; as max) {
          <sum-input [parentForm]="form" [max]="max"></sum-input>
        }
      </div>
    </form>
  `,
})
export class TransferComponent extends ReactiveForm implements OnInit, OnDestroy {
  protected form: FormGroup
  protected formSubscription?: Subscription
  protected coinsSubscription?: Subscription
  protected maxSum: number

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private twa: TwaService,
    private bankService: BankService,
    protected coinsService: CoinsService,
  ) {
    super()
    this.maxSum = this.coinsService.balance
    this.form = this.formBuilder.group({})
  }

  ngOnInit() {
    this.formSubscription = this.form.statusChanges
      .subscribe((status: FormControlStatus) => this.twa.mainButtonIsActive(status == "VALID"))
    this.coinsSubscription = this.coinsService.balanceSubject
      .subscribe({
        next: (value) => this.onNextBalance(value),
        error: () => this.goBack()
      })
    this.twa.backButtonOnClick(() => this.goBack())
    this.twa.setMainButton({text: 'Transfer', is_active: true, is_visible: true}, () => this.transfer())
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe()
    this.coinsSubscription?.unsubscribe()
    this.twa.mainButtonIsActive(true)
    this.twa.offBackButton(() => this.goBack())
    this.twa.offMainButton(() => this.transfer())
  }

  private onNextBalance(balance: number) {
    if (balance !== this.maxSum) { // if balance updated or changed from another device
      this.goBack()
    }

    if (this.form.invalid) {
      this.twa.showAlert('Form invalid')
      return
    }

    const form: { sum: number } = this.form.value

    if (form.sum > balance) {
      this.twa.showAlert('Error balance')
      return
    }

    const bank = this.bankService.balance

    try {
      this.bankService.saveBalance(bank + form.sum)
      this.coinsService.saveBalance(balance - form.sum)
    } catch (error) {
      this.twa.showAlert(error as string)
      this.bankService.saveBalance(bank)
      this.coinsService.saveBalance(balance)
    }
  }

  transfer() {
    this.coinsService.loadBalance()  // see OnInit - if balance !== this.maxSum -> goBack
  }

  goBack() {
    this.location.back()
  }
}
