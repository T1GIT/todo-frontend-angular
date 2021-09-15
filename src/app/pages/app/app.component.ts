import { Component, OnInit } from '@angular/core'
import { AuthService } from "../../core/auth/auth.service"
import { Router } from "@angular/router"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthorized$
      .subscribe(isAuthorized => {
        if (isAuthorized) {
          this.router.navigate(['todo'])
        }
        else {
          this.router.navigate(['authorization'])
        }
      })
    this.authService.isInitialized$
      .subscribe(() => this.authService.refresh().subscribe())
  }
}
