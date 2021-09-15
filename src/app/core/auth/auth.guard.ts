import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable, of } from 'rxjs'
import { AuthService } from "./auth.service"
import { map, tap, withLatestFrom } from "rxjs/operators"
import { AuthorizationComponent } from "../../authorization/pages/authorization/authorization.component"

@Injectable()
export class AuthGuard implements CanDeactivate<unknown> {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  //
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> {
  //   return of(route)
  //     .pipe(
  //       withLatestFrom(this.authService.isAuthorized$),
  //       tap(console.log),
  //       map(([route, isAuthorized]) => {
  //         if (isAuthorized)
  //           return route.component !== AuthorizationComponent
  //         else
  //           return route.component === AuthorizationComponent
  //       }),
  //       tap(console.log),
  //     )
  // }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> {
    return of(currentRoute)
      .pipe(
        withLatestFrom(this.authService.isAuthorized$),
        tap(console.log),
        map(([route, isAuthorized]) => {
          if (isAuthorized)
            return route.component === AuthorizationComponent
          else
            return route.component !== AuthorizationComponent
        }),
        tap(console.log),
      )
  }
}
