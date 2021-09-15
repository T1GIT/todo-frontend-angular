import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core'
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"
import { AuthService } from "./auth.service"
import { AuthInterceptor } from "./auth.interceptor"


export const AUTH_CONFIG = new InjectionToken<string>("AUTH_CONFIG")

export type AuthConfig = {
  baseUrl: string
}

@NgModule({
  imports: [HttpClientModule],
})
export class AuthModule {
  static forRoot(config: AuthConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        {
          provide: AUTH_CONFIG,
          useValue: config
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ],
    }
  }
}
