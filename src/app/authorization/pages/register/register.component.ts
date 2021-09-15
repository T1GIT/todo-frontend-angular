import { Component } from '@angular/core'
import { FormControl, Validators } from "@angular/forms"
import { AuthService } from "../../../core/auth/auth.service"
import * as _ from "lodash"
import { throttleTime } from "rxjs/operators"
import { pswValidator, rePswValidator } from "../../shared/validators"


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  public email = new FormControl(null, [
    Validators.required,
    Validators.email
  ])
  public psw = new FormControl(null, [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(255),
    pswValidator()
  ])
  public isPswHidden: boolean = true
  public rePsw = new FormControl(null, [
    Validators.required,
    rePswValidator(this.psw)
  ])
  public name = new FormControl(null, Validators.maxLength(100))
  public surname = new FormControl(null, Validators.maxLength(100))
  public patronymic = new FormControl(null, Validators.maxLength(100))
  public birthdate = new FormControl(null)
  public birthdateMax = new Date()

  constructor(
    private authService: AuthService
  ) {}

  public isValid(): boolean {
    const { email, psw, rePsw, name, surname, patronymic, birthdate } = this
    return email.valid && psw.valid && rePsw.valid && name.valid && surname.valid && patronymic.valid && birthdate.valid
  }

  public register(): void {
    const { email, psw, name, surname, patronymic, birthdate } = this
    const user = {
      email: email.value,
      psw: psw.value
    }
    const additional = {
      name: name.value,
      surname: surname.value,
      patronymic: patronymic.value,
      birthdate: birthdate.value
    }
    this.authService.register({
      ...user,
      ..._.omitBy(additional, _.isNil)
    }).pipe(
      throttleTime(500)
    ).subscribe({
      error: ({error: {error: {code}}}) => {
        if (code === 409)
          email.setErrors({ exists: true })
      }
    })
  }
}
