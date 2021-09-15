import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms"


export function pswValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const errors: {
      alphaAbsent?: boolean,
      numberAbsent?: boolean
    } = {}
    if (control.errors)
      return null
    if (!/(?=[a-zA-Zа-яА-Я])/.test(control.value))
      errors.alphaAbsent = true
    if (!/(?=\d)/.test(control.value))
      errors.numberAbsent = true
    return errors ? errors : null
  }
}

export function rePswValidator(psw: FormControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return psw.value != control.value
      ? { mismatch: true }
      : null
  }
}
