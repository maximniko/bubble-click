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
import {BankService} from '../../../domains/bank/services/bank/bank.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DepositInputsComponent],
  template: `
    <section class="accent-border accent-border-top accent-bg-shadow card rounded-5 h-100">
      <div class="hstack p-3 pb-0 color-accent">
        <span class="m-auto text-center h5">New deposit (amount {{ bankService.balanceSubject | async }}):</span>
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
    protected bankService: BankService,
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
        this.goBack()
      },
    })
    this.twa.setMainButton({text: 'Add', is_active: true, is_visible: true}, () => this.add())
    this.twa.backButtonOnClick(() => this.goBack())
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe()
    this.twa.offBackButton(() => this.goBack())
    this.twa.offMainButton(() => this.add())
  }

  protected add() {
    this.depositService.loadDeposits()
  }

  protected onNextBalance(deposits: Deposit[]) {
    if (this.startDeposits.length && deposits !== this.startDeposits) { // if updated or changed from another device
      this.twa.showAlert(`income count ${deposits.length} != start length ${this.startDeposits.length}`)
      this.goBack()
      return
    }

    this.form.updateValueAndValidity()

    if (this.form.invalid) {
      return
    }

    const newDeposits: Deposit[] = deposits,
      formDeposit: Deposit = this.form.value,
      bank: number = this.bankService.balance

    if (!formDeposit.plan || !formDeposit.fromDate || formDeposit.sum < 1) {
      return
    }

    newDeposits.push(formDeposit)

    try {
      this.depositService.saveDeposits(newDeposits)
      this.bankService.saveBalance(bank - formDeposit.sum)
      this.form.reset()
    } catch (e) {
      this.twa.showAlert((<Error>e).message)
      this.depositService.saveDeposits(deposits)
      this.bankService.saveBalance(bank)
    }
  }

  goBack() {
    this.router.navigate([routeCreator.deposit()])
  }
}
