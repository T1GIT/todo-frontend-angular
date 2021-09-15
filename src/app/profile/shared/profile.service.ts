import { Inject, Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import { Observable, Subject } from "rxjs"
import { User } from "./models/user"
import { map, tap, withLatestFrom } from "rxjs/operators"
import * as _ from "lodash"
import { AuthService } from "../../core/auth/auth.service"
import { PROFILE_CONFIG, ProfileConfig } from "./types"


@Injectable()
export class ProfileService {
  private readonly baseUrl: string
  private user = new Subject<User>()

  public readonly user$ = this.user.asObservable()

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(PROFILE_CONFIG) private config: ProfileConfig
  ) {
    this.baseUrl = `${ config.baseUrl }/user`
    this.authService.jwt$
      .subscribe(jwt => {
        if (jwt)
          this.get()
        else
          this.user.next()
      })
  }

  public get(): Observable<void> {
    return this.http.get<User>(this.baseUrl)
      .pipe(
        map(user => this.user.next(user)),
        tap(console.log)
      )
  }

  public update(user: Partial<User>): Observable<void> {
    return this.http.patch<void>(this.baseUrl, user)
      .pipe(
        withLatestFrom(this.user),
        map(() => {
          this.user$.subscribe(u =>
            this.user.next(_.assign(u, user)))
        })
      )
  }

  public remove(): Observable<void> {
    return this.http.delete<void>(this.baseUrl)
      .pipe(
        tap(() => this.user.next())
      )
  }
}
