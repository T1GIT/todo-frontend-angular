import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TodoComponent } from './pages/todo/todo.component'
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"


export const HOME_CONFIG = new InjectionToken<string>("HOME_CONFIG")

export type HomeConfig = {
  baseUrl: string
}

@NgModule({
  declarations: [TodoComponent],
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  exports: [TodoComponent],
  bootstrap: [TodoComponent]
})
export class TodoModule {
  static forRoot(config: HomeConfig): ModuleWithProviders<TodoModule> {
    return {
      ngModule: TodoModule,
      providers: [{ provide: HOME_CONFIG, useValue: config }]
    }
  }

  public constructor(@Optional() @SkipSelf() parentModule: TodoModule) {
    if(parentModule) {
      throw new Error('TodoModule has already been imported.');
    }
  }
}
