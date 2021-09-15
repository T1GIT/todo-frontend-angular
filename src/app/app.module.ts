import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { environment } from "../environments/environment"
import { AuthorizationModule } from "./authorization/authorization.module"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthModule } from "./core/auth/auth.module"
import { TodoModule } from "./todo/todo.module"
import { AppComponent } from "./pages/app/app.component"
import { ProfileModule } from "./profile/profile.module"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule.forRoot({ baseUrl: environment.apiUrl }),
    TodoModule.forRoot({ baseUrl: environment.apiUrl }),
    ProfileModule.forRoot({ baseUrl: environment.apiUrl }),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AuthorizationModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
