import { Injectable } from "@angular/core"
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Observable, of } from "rxjs"
import { map, mergeAll, tap, withLatestFrom } from "rxjs/operators"
import { AuthService } from "./auth.service"


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(req)
      .pipe(
        withLatestFrom(this.authService.jwt$),
        map(([req, jwt]) =>
          req.clone({
            headers: !!jwt
              ? req.headers.set('Authorization', `Bearer ${ jwt }`)
              : undefined,
            withCredentials: true
          })
        ),
        map(req => next.handle(req)),
        mergeAll()
      )
  }
}
