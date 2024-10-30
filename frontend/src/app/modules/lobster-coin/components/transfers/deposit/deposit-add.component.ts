import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {DepositService} from '../../../domains/bank/services/deposit/deposit.service';
import {FormBuilder, FormControlStatus, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ReactiveForm} from '../../../../../common/components/reactive-form.component';
import {Deposit} from '../../../domains/bank/interfaces/deposit.interface';
import {TwaService} from '../../../../../common/services/twa.service';
import {DepositInputsComponent} from './_inputs/deposit-inputs.component';
import {Subscription} from 'rxjs';
import {SumInputComponent} from '../_inputs/sum/sum-input.component';
import {Router} from '@angular/router';
import {routeCreator} from '../../../lobster-coin.routes';
import {BankService} from '../../../domains/bank/services/bank/bank.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DepositInputsComponent, SumInputComponent],
  template: `
    <div class="mx-2 my-4">
      <h5 class="h5">New deposit:</h5>
      <form [formGroup]="form">
        <deposit-inputs [parentForm]="form"></deposit-inputs>
      </form>
    </div>
  `,
})
export class DepositAddComponent extends ReactiveForm implements OnInit, OnDestroy {
  protected form: FormGroup
  protected formSubscription?: Subscription
  protected depositsSubscription?: Subscription
  protected startDeposits: Deposit[]

  constructor(
    private router: Router,
    private depositService: DepositService,
    private bankService: BankService,
    private formBuilder: FormBuilder,
    private twa: TwaService,
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
      error: () => this.goBack(),
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
    if (deposits !== this.startDeposits) { // if updated or changed from another device
      this.goBack()
      return
    }

    if (this.form.invalid) {
      return
    }

    const newDeposits: Deposit[] = deposits,
      formDeposit: Deposit = this.form.value,
      bank: number = this.bankService.balance

    newDeposits.push(formDeposit)

    try {
      this.depositService.saveDeposits(newDeposits)
      this.bankService.saveBalance(bank - formDeposit.sum)
      this.form.reset()
    } catch (e) {
      this.depositService.saveDeposits(deposits)
      this.bankService.saveBalance(bank)
      this.twa.showAlert((<Error>e).message)
    }
  }

  private goBack() {
    this.router.navigate([routeCreator.bankDeposit()])
  }
}
