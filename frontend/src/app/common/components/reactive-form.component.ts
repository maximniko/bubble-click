import {ValidationErrors} from "@angular/forms";
import {Component, inject} from "@angular/core";
import {Localisation} from "../services/localisation";
import {sprintf} from "sprintf-js";

@Component({template: ''})
export abstract class ReactiveForm {
  protected localisation = inject(Localisation)
  protected isInvalid(item: any): boolean | undefined {
    return item?.invalid && (item?.dirty || item?.touched)
  }

  protected errors(item: any): ValidationErrors | null | undefined {
    return item?.errors
  }

  validationErrors(errors: ValidationErrors | null | undefined, name: string): string|null {
    if (!errors) {
      return null
    }

    let result: string[] = []

    if (errors?.['required']) {
      result.push(sprintf(this.localisation.t.requiredErr ?? "%s is required.", name))
    }
    if (errors?.['minlength']) {
      result.push(sprintf(this.localisation.t.minlengthErr ?? "Minimum length of %s is %s.", name, errors?.['minlength']['requiredLength']))
    }
    if (errors?.['maxlength']) {
      result.push(sprintf(this.localisation.t.maxlengthErr ?? "Maximum length of %s is %s.", name, errors?.['maxlength']['requiredLength']))
    }
    if (errors?.['email']) {
      result.push(sprintf(this.localisation.t.emailErr ?? "%s must be an email address.", name))
    }
    if (errors?.['pattern']) {
      result.push(sprintf(this.localisation.t.patternErr ?? "%s is not valid.", name))
    }
    if (errors?.['invalidPhone']) {
      result.push(sprintf(this.localisation.t.invalidPhoneErr ?? "%s is invalid phone.", name))
    }
    if (errors?.['invalidType']) {
      result.push(sprintf(this.localisation.t.invalidTypeErr ?? "%s is invalid type.", name))
    }

    return result.join('\n')
  }
}
