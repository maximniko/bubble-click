import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControlStatus, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SumInputComponent} from '../_inputs/sum/sum-input.component';
import {ReactiveForm} from '../../../../../common/components/reactive-form.component';
import {Subscription} from 'rxjs';
import {TwaService} from '../../../../../common/services/twa.service';
import {BankService} from '../../../domains/bank/services/bank/bank.service';
import {CoinsService} from '../../../domains/coins/services/coins.service';
import {Router} from '@angular/router';
import {routeCreator} from '../../../lobster-coin.routes';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, SumInputComponent, ReactiveFormsModule],
  template: `
    <section class="accent-border accent-border-top accent-bg-shadow rounded-5 tg-bg-secondary">
      <div class="hstack p-3 pb-0 color-accent">
        <span class="m-auto text-center h5">Transfer (amount: {{ this.coinsService.balanceSubject | async }})</span>
      </div>
      <div class="d-flex flex-column h-100 mb-5">
        <div class="mx-2 my-4">
          <form [formGroup]="form">
            <sum-input [parentForm]="form" [max]="maxSum"></sum-input>
          </form>
        </div>
      </div>
    </section>`,
  host: {class: 'd-flex flex-column h-100'},
})
export class TransferComponent extends ReactiveForm implements OnInit, OnDestroy {
  protected form: FormGroup
  protected formSubscription?: Subscription
  protected coinsSubscription?: Subscription
  protected maxSum: number

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
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
    this.twa.offBackButton(() => this.goBack())
    this.twa.offMainButton(() => this.transfer())
  }

  private onNextBalance(balance: number) {
    if (balance !== this.maxSum) { // if balance updated or changed from another device
      this.goBack()
      return
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

    const bank = this.bankService.balance

    try {
      this.bankService.saveBalance(bank + form.sum)
      this.coinsService.saveBalance(balance - form.sum)
      this.form.reset()
    } catch (e) {
      this.twa.showAlert((<Error>e).message)
      this.bankService.saveBalance(bank)
      this.coinsService.saveBalance(balance)
    }
  }

  transfer() {
    this.coinsService.loadBalance()  // see OnInit - if balance !== this.maxSum -> goBack
  }

  goBack() {
    this.router.navigate([routeCreator.balance()])
  }
}
