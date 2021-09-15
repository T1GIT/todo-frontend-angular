import { NgModule, Optional, SkipSelf } from '@angular/core'
import { AuthorizationComponent } from './pages/authorization/authorization.component'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatTabsModule } from "@angular/material/tabs"
import { MAT_DATE_FORMATS, NativeDateModule } from "@angular/material/core"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatExpansionModule } from "@angular/material/expansion"
import { DATE_FORMAT } from "./shared/dateFormats"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"


@NgModule({
  declarations: [
    AuthorizationComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    NativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [{provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}],
  exports: [AuthorizationComponent],
  bootstrap: [AuthorizationComponent]
})
export class AuthorizationModule {

  public constructor(@Optional() @SkipSelf() parentModule: AuthorizationModule) {
    if(parentModule) {
      throw new Error('AuthorizationModule has already been imported.');
    }
  }
}
