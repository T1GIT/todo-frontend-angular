import { Component, OnInit } from '@angular/core'
import { ProfileService } from "../../shared/profile.service"
import { AuthService } from "../../../core/auth/auth.service"
import { Observable } from "rxjs"
import { User } from "../../shared/models/user"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  public user$: Observable<User>

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {
    this.user$ = profileService.user$
  }

  ngOnInit(): void {
    this.authService.jwt$
      .subscribe(jwt => this.profileService.get())
  }

}
