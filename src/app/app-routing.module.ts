import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TodoComponent } from "./todo/pages/todo/todo.component"
import { AuthorizationComponent } from "./authorization/pages/authorization/authorization.component"


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
