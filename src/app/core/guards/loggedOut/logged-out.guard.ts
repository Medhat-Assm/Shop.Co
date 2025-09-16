import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatformService } from '../../services/platform/platform.service';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, map, of } from 'rxjs';

export const loggedOutGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const platformService: PlatformService = inject(PlatformService);
  const authService: AuthService = inject(AuthService);

  if (!platformService.checkPlatFormBrowser()) {
    return true;
  }

  return authService.verifyToken().pipe(
    map(() => true),
    catchError(() => of(router.createUrlTree(['/login'])))
  );
};
