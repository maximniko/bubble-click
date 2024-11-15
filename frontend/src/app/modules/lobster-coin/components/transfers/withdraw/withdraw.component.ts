import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControlStatus, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SumInputComponent} from '../_inputs/sum/sum-input.component';
import {ReactiveForm} from '../../../../../common/components/reactive-form.component';
import {Subscription} from 'rxjs';
import {TwaService} from '../../../../../common/services/twa.service';
import {BankService} from '../../../domains/bank/services/bank/bank.service';
import {CoinsService} from '../../../domains/coins/services/coins.service';
import {routeCreator} from '../../../lobster-coin.routes';
import {Router} from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, SumInputComponent, ReactiveFormsModule],
  template: `
    <section class="accent-border accent-border-top accent-bg-shadow rounded-5 tg-bg-secondary">
      <div class="hstack p-3 pb-0 color-accent">
        <span class="m-auto text-center h5">Вывести (макс: {{ this.bankService.balanceSubject | async }})</span>
      </div>
      <div class="d-flex flex-column h-100 mb-5">
        <div class="mx-2 my-4">
          <form [formGroup]="form">
            <sum-input [parentForm]="form" [max]="maxSum"></sum-input>
          </form>
        </div>
      </div>
    </section>
  `,
  host: {class: 'd-flex flex-column h-100'},
})
export class WithdrawComponent extends ReactiveForm implements OnInit, OnDestroy {
  protected form: FormGroup
  protected formSubscription?: Subscription
  protected balanceSubscription?: Subscription
  protected maxSum: number

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
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
    this.twa.backButtonOnClick(this.goBack.bind(this))
    this.twa.setMainButton({text: 'Вывести', is_active: true, is_visible: true}, this.withdraw.bind(this))
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe()
    this.balanceSubscription?.unsubscribe()
    this.twa.offBackButton(this.goBack.bind(this))
    this.twa.offMainButton(this.withdraw.bind(this))
  }

  withdraw() {
    this.bankService.loadBalance()
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
      this.twa.showAlert('Ошибка баланса')
      return
    }

    if (!form.sum || isNaN(form.sum)) {
      return
    }
    const coins = this.coinsService.balance

    try {
      this.coinsService.saveBalance(coins + form.sum)
      this.bankService.saveBalance(balance - form.sum)
      this.form.reset()
    } catch (e) {
      this.twa.showAlert((<Error>e).message)
      this.coinsService.saveBalance(coins)
      this.bankService.saveBalance(balance)
    }
  }

  goBack() {
    this.router.navigate([routeCreator.balance()])
  }
}
