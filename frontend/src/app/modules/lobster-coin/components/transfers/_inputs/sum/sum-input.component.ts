import {ReactiveForm} from '../../../../../../common/components/reactive-form.component';
import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'sum-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-floating mb-3">
      <input [autofocus]="true" type="text" class="form-control" placeholder="Coins" id="form-sum" formControlName="sum" [ngClass]="{
            'is-invalid': isInvalidSum,
            'is-valid': parentForm.valid,
          }">
      <label for="form-sum">Coins</label>
      <div class="invalid-feedback" *ngIf="isInvalidSum">
        {{ validationErrors(sumErrors, 'Sum') }}
      </div>
    </div>`,
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})
export class SumInputComponent extends ReactiveForm implements OnInit {
  @Input() parentForm!: FormGroup
  @Input() max!: number

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.parentForm.addControl('sum', this.formBuilder.control(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(this.max),
    ]))
  }

  private get sum() {
    return this.parentForm.get('sum');
  }

  get sumErrors() {
    return this.errors(this.sum);
  }

  get isInvalidSum(): boolean | undefined {
    return this.isInvalid(this.sum)
  }
}
