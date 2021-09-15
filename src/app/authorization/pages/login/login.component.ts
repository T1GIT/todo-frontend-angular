import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms"
import { AuthService } from "../../../core/auth/auth.service"
import { catchError } from "rxjs/operators"
import { pswValidator } from "../../shared/validators"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  public email = new FormControl(null, [
    Validators.required,
    Validators.email,
  ])
  public psw = new FormControl(null, [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(255),
    pswValidator()
  ])
  public isPswHidden: boolean = true

  public constructor(
    private authService: AuthService
  ) {}

  public isValid(): boolean {
    const {email, psw} = this
    return email.valid && psw.valid
  }

  public login(): void {
    const {email, psw} = this
    this.authService.login({
      email: email.value,
      psw: psw.value,
    }).subscribe({
      error: ({error: {error: {code}}}) => {
        if (code == 404)
          this.email.setErrors({notFound: true})
    }
    })
  }
}
