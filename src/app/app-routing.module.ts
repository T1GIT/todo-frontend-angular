import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from "./core/auth/auth.guard"
import { TodoComponent } from "./todo/pages/todo/todo.component"
import { AuthorizationComponent } from "./authorization/pages/authorization/authorization.component"
import { ProfileModule } from "./profile/profile.module"
import { ProfileComponent } from "./profile/components/profile/profile.component"


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/authorization' },
  { path: 'authorization', component: AuthorizationComponent},
  { path: 'todo', component: TodoComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
