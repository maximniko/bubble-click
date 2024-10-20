import {CommonModule, Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {DepositService} from '../../../domains/bank/services/deposit/deposit.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ReactiveForm} from '../../../../../common/components/reactive-form.component';
import {Deposit} from '../../../domains/bank/interfaces/deposit.interface';
// TODO make form
@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" placeholder="Title" id="form-title" formControlName="title" [ngClass]="{
            'is-invalid': isInvalidTitle,
            'is-valid': parentForm.valid,
          }">
        <label for="form-title">Title</label>
        <div class="invalid-feedback" *ngIf="isInvalidTitle">
          {{ validationErrors(titleErrors, 'Title') }}
        </div>
      </div>
    </form>
    <button (click)="goBack()">back</button>
  `,
})
export class DepositAddComponent extends ReactiveForm implements OnInit {
  protected form: FormGroup

  constructor(
    private location: Location,
    private depositService: DepositService,
    private formBuilder: FormBuilder,
  ) {
    super()
    this.form = this.formBuilder.group({})
  }

  ngOnInit() {
    this.form.addControl('plan', this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(32),
    ]))
    this.form.addControl('fromDate', this.formBuilder.control('', [
      Validators.required,
    ]))
    this.form.addControl('sum', this.formBuilder.control('', [
      Validators.min(3),
      Validators.maxLength(255),
    ]))
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const deposit: Deposit = this.form.value
    this.service.create(deposit).subscribe(
      (category: Category) => this.router.navigate([routeCreator.categoryViewId(category)])
    )
  }

  goBack() {
    this.location.back()
  }
}
