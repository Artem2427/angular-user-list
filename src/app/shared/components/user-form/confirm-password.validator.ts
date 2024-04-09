import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  return control.value.password === control.value.repeatPassword
    ? null
    : { PasswordNoMatch: true, message: 'Please enter the same password' }
}
