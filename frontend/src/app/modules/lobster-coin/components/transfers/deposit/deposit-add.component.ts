import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {DepositService} from '../../../domains/bank/services/deposit/deposit.service';
import {FormBuilder, FormControlStatus, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ReactiveForm} from '../../../../../common/components/reactive-form.component';
import {Deposit} from '../../../domains/bank/interfaces/deposit.interface';
import {TwaService} from '../../../../../common/services/twa.service';
import {DepositInputsComponent} from './_inputs/deposit-inputs.component';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {routeCreator} from '../../../lobster-coin.routes';
import {CoinsService} from '../../../domains/coins/services/coins.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DepositInputsComponent],
  template: `
    <section class="accent-border accent-border-top accent-bg-shadow rounded-5 tg-bg-secondary">
      <div class="hstack p-3 pb-0 color-accent">
        <span class="m-auto text-center h5">Новый депозит (макс. {{ coinsService.balanceSubject | async }}):</span>
      </div>
      <div class="d-flex flex-column h-100 mb-5">
        <div class="mx-2 my-4">
          <form [formGroup]="form">
            <deposit-inputs [parentForm]="form"></deposit-inputs>
          </form>
<!--          <button (click)="add()">add</button>-->
        </div>
      </div>
    </section>
  `,
  host: {class: 'd-flex flex-column h-100'},
})
export class DepositAddComponent extends ReactiveForm implements OnInit, OnDestroy {
  protected form: FormGroup
  protected formSubscription?: Subscription
  protected depositsSubscription?: Subscription
  protected startDeposits: Deposit[]

  constructor(
    protected coinsService: CoinsService,
    private depositService: DepositService,
    private twa: TwaService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    super()
    this.form = this.formBuilder.group({})
    this.startDeposits = this.depositService.deposits
  }

  ngOnInit() {
    this.formSubscription = this.form.statusChanges
      .subscribe((status: FormControlStatus) => this.twa.mainButtonIsActive(status == "VALID"))
    this.depositsSubscription = this.depositService.depositsSubject.subscribe({
      next: (value) => this.onNextBalance(value),
      error: (err) => {
        this.twa.showAlert(err.toString())
      },
    })
    this.twa.setMainButton({text: 'Создать', is_active: true, is_visible: true}, () => this.addDeposit())
    this.twa.backButtonOnClick(() => this.goBack())
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe()
    this.depositsSubscription?.unsubscribe()
    this.twa.offBackButton(() => this.goBack())
    this.twa.offMainButton(() => this.addDeposit())
  }

  addDeposit() {
    this.depositService.loadDeposits()
  }

  protected onNextBalance(deposits: Deposit[]) {
    if (this.startDeposits.length && deposits.toString() !== this.startDeposits.toString()) { // if updated or changed from another device
      this.goBack()
      return
    }

    this.form.updateValueAndValidity()

    if (this.form.invalid) {
      return
    }

    const newDeposits: Deposit[] = Array.from(deposits),
      formDeposit: Deposit = this.form.value,
      coins: number = this.coinsService.balance

    if (formDeposit.sum > coins) {
      this.twa.showAlert('Ошибка баланса')
      return;
    }

    if (!formDeposit.plan || !formDeposit.sum || isNaN(formDeposit.sum)) {
      return
    }

    formDeposit.fromDate = new Date()

    newDeposits.push(formDeposit)

    try {
      this.coinsService.saveBalance(coins - formDeposit.sum)
      this.depositService.saveDeposits(newDeposits)
      this.form.reset()
    } catch (e) {
      this.twa.showAlert((<Error>e).message)
      this.coinsService.saveBalance(coins)
      this.depositService.saveDeposits(deposits)
    }
  }

  goBack() {
    this.router.navigate([routeCreator.deposit()])
  }
}
