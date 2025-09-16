import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatformService } from '../../services/platform/platform.service';

export const loggedInGuard: CanActivateFn = (route, state) => {
  let router: Router = inject(Router);
  let myPlatformService: PlatformService = inject(PlatformService);
  if (myPlatformService.checkPlatFormBrowser()) {
    const token = localStorage.getItem('userToken');
    if (!token) {
      return true;
    }
    return router.createUrlTree(['/home']);
  }
  return true;
};
