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
      result.push(sprintf(this.localisation.messages.errRequired ?? "%s is required.", name))
    }
    if (errors?.['minlength']) {
      result.push(sprintf(this.localisation.messages.errMinlength ?? "Minimum length of %s is %s.", name, errors?.['minlength']['requiredLength']))
    }
    if (errors?.['maxlength']) {
      result.push(sprintf(this.localisation.messages.errMaxlength ?? "Maximum length of %s is %s.", name, errors?.['maxlength']['requiredLength']))
    }
    if (errors?.['min']) {
      result.push(sprintf(this.localisation.messages.errMin ?? "Minimum of %s is %s.", name, errors?.['min']['min']))
    }
    if (errors?.['max']) {
      result.push(sprintf(this.localisation.messages.errMax ?? "Maximum of %s is %s.", name, errors?.['max']['max']))
    }
    if (errors?.['email']) {
      result.push(sprintf(this.localisation.messages.errEmail ?? "%s must be an email address.", name))
    }
    if (errors?.['pattern']) {
      result.push(sprintf(this.localisation.messages.errPattern ?? "%s is not valid.", name))
    }
    if (errors?.['invalidPhone']) {
      result.push(sprintf(this.localisation.messages.errInvalidPhone ?? "%s is invalid phone.", name))
    }
    if (errors?.['invalidType']) {
      result.push(sprintf(this.localisation.messages.errInvalidType ?? "%s is invalid type.", name))
    }

    return result.join('\n')
  }
}
