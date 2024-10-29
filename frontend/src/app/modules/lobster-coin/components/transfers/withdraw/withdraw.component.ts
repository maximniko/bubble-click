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
        @if (bankService.balanceSubject| async; as max) {
          <sum-input [parentForm]="form" [max]="max"></sum-input>
        }
      </div>
    </form>
    <button (click)="goBack()">back</button>
  `,
})
export class WithdrawComponent extends ReactiveForm implements OnInit, OnDestroy {
  protected form: FormGroup
  protected formSubscription?: Subscription
  protected balanceSubscription?: Subscription
  protected maxSum: number

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private twa: TwaService,
    protected bankService: BankService,
    protected coinsService: CoinsService,
  ) {
    super()
    this.maxSum = this.bankService.balance
    this.form = this.formBuilder.group({})
  }

  ngOnInit() {
    this.formSubscription = this.form.statusChanges
      .subscribe((status: FormControlStatus) => this.twa.mainButtonIsActive(status == "VALID"))
    this.balanceSubscription = this.bankService.balanceSubject
      .subscribe({
        next: (value) => this.onNextBalance(value),
        error: () => this.goBack()
      })
    this.twa.backButtonOnClick(() => this.goBack())
    this.twa.setMainButton({text: 'Withdraw', is_active: true, is_visible: true}, () => this.withdraw())
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe()
    this.balanceSubscription?.unsubscribe()
    this.twa.mainButtonIsActive(true)
    this.twa.offBackButton(() => this.goBack())
    this.twa.offMainButton(() => this.withdraw())
  }

  withdraw() {
    this.bankService.loadBalance()
  }

  private onNextBalance(balance: number) {
    if (balance !== this.maxSum) { // if balance updated or changed from another device
      this.goBack()
    }

    if (this.form.invalid) {
      return
    }

    const form: { sum: number } = this.form.value

    if (form.sum > balance) {
      this.twa.showAlert('Error balance')
      return
    }

    if (!form.sum || isNaN(form.sum)) {
      return
    }
    const coins = this.coinsService.balance

    try {
      this.coinsService.saveBalance(coins + form.sum)
      this.bankService.saveBalance(balance - form.sum)
    } catch (e) {
      this.twa.showAlert((<Error>e).message)
      this.coinsService.saveBalance(coins)
      this.bankService.saveBalance(balance)
      this.goBack()
    }
  }

  goBack() {
    this.location.back()
  }
}
