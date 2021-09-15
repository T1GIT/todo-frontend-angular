import { Inject, Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, interval, merge, Observable, pipe, Subject, Subscription, timer } from "rxjs"
import { map, mergeAll, tap } from "rxjs/operators"
import { load } from "@fingerprintjs/fingerprintjs"
import jwtDecode from "jwt-decode"
import { JwtPayload, JwtResponse, LoginForm, RegisterForm } from "./shared/types"
import { AUTH_CONFIG, AuthConfig } from "./auth.module"
import { fromPromise } from "rxjs/internal-compatibility"


@Injectable()
export class AuthService {
  private readonly baseUrl: string
  private fingerprint?: string
  private refreshInterval?: Subscription
  private jwt = new BehaviorSubject<string | null>(null)
  private isAuthorized = new BehaviorSubject(false)
  private isInitialized = new Subject<boolean>()

  public readonly jwt$ = this.jwt.asObservable()
  public readonly isAuthorized$ = this.isAuthorized.asObservable()
  public readonly isInitialized$ = this.isInitialized.asObservable()

  public constructor(
    private http: HttpClient,
    @Inject(AUTH_CONFIG) private config: AuthConfig
  ) {
    this.baseUrl = `${ config.baseUrl }/authorization`
    fromPromise(load())
      .pipe(
        map(agent => agent.get()),
        mergeAll(),
        tap(result => this.fingerprint = result.visitorId),
        tap(() =>
          this.jwt.subscribe(jwt => {
            this.isAuthorized.next(!!jwt)
            this.isInitialized.next(true)
            this.setTimerByJwt(jwt)
          }))
      ).subscribe()
  }

  public register(user: RegisterForm): Observable<void> {
    return this.http.post<JwtResponse>(
      this.baseUrl,
      { user, fingerprint: this.fingerprint }
    ).pipe(
      map(({ jwt }) => this.jwt.next(jwt))
    )
  }

  public login(user: LoginForm): Observable<void> {
    return this.http.post<JwtResponse>(
      `${ this.baseUrl }/login`,
      { user, fingerprint: this.fingerprint }
    ).pipe(
      map(({ jwt }) => this.jwt.next(jwt))
    )
  }

  public refresh(): Observable<void> {
    return this.http.put<JwtResponse>(
      this.baseUrl,
      { fingerprint: this.fingerprint }
    ).pipe(
      tap({
        next: console.log,
        error: console.error
      }),
      map(({ jwt }) => this.jwt.next(jwt))
    )
  }

  public logout(): Observable<void> {
    this.jwt.next(null)
    return this.http.delete<void>(this.baseUrl, {})
  }

  private setTimerByJwt(jwt: string | null): void {
    if (typeof jwt === "string") {
      const { exp, iat } = jwtDecode<JwtPayload>(jwt)
      const period = (exp - iat - 20) * 1000
      // TODO: Doesn't work
      this.refreshInterval = timer(period)
        .subscribe(() => this.refresh().subscribe())
    } else {
      this.refreshInterval?.unsubscribe()
    }
  }
}
