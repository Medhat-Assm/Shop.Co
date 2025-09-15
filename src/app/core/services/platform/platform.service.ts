import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
   constructor(@Inject(PLATFORM_ID) private id: Object) {}

  //return true or false
  checkPlatFormBrowser():boolean {
    if (isPlatformBrowser(this.id)) {
      return true;
    }
    return false;
  }

}
