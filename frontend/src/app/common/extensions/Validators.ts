import {AbstractControl, ValidatorFn} from "@angular/forms";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";

export function InValidator<T>(items: T[]): ValidatorFn {
  return (control: AbstractControl<T>): { [key: string]: any } | null => {
   if (typeof control.value == "object") {
      if (!items.includes(control.value)) {
        return {'invalidType': true};
      }
    } else if (items.indexOf(control.value) < 0) {
      return {'invalidType': true};
    }
    return null;
  }
}

export function DateValidator(today: NgbDate): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let value = control.value;

    if (value && typeof value === "string") {
      let match = value.match(/^([10]\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
      if (!match) {
        return {'invalidType': true};
      } else if (match && match[0] !== value) {
        return {'invalidType': true};
      }
    }

    const ngbValue = NgbDate.from(value)

    if (ngbValue instanceof NgbDate) {
      ngbValue.after(today)
      if (ngbValue.after(today)) {
        return {'invalidType': true};
      }
    }

    return null;
  }
}
