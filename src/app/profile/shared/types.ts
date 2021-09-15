import { InjectionToken } from "@angular/core"


export const PROFILE_CONFIG = new InjectionToken<string>("PROFILE_CONFIG")

export type ProfileConfig = {
  baseUrl: string
}
