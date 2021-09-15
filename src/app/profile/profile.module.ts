import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core'
import { ProfileComponent } from "./components/profile/profile.component"
import { ProfileService } from "./shared/profile.service"
import { PROFILE_CONFIG, ProfileConfig } from "./shared/types"


@NgModule({
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  bootstrap: [ProfileComponent]
})
export class ProfileModule {
  static forRoot(config: ProfileConfig): ModuleWithProviders<ProfileModule> {
    return {
      ngModule: ProfileModule,
      providers: [
        ProfileService,
        { provide: PROFILE_CONFIG, useValue: config }
      ]
    }
  }

  public constructor(@Optional() @SkipSelf() parentModule: ProfileModule) {
    if(parentModule) {
      throw new Error('ProfileModule has already been imported.');
    }
  }
}
