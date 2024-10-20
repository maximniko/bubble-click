import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveForm} from '../../../../../common/components/reactive-form.component';

@Component({
  standalone: true,
  imports: [CommonModule, NgbInputDatepicker],
  template: `
    <form>
      <div class="mb-3">
        <label for="dateOfBirth">Date of birth</label>
        <div class="input-group">
          <input
            id="dateOfBirth"
            class="form-control"
            placeholder="yyyy-mm-dd"
            name="dp"
            ngbDatepicker
            #dp="ngbDatepicker"
          />
          <button class="btn btn-outline-secondary bi bi-calendar3" (click)="dp.toggle()" type="button"></button>
        </div>
      </div>
    </form>
  `,
})
export class WithdrawFormComponent extends ReactiveForm {
  @Output() withdrawEventEmitter = new EventEmitter<number>()
  @Input() balance: number = 0

  onSend() {
    this.withdrawEventEmitter.emit()
  }
}
