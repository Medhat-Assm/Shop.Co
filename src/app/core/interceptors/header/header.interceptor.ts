import { HttpInterceptorFn } from '@angular/common/http';
import { PlatformService } from '../../services/platform/platform.service';
import { inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let platformBrowser: PlatformService = inject(PlatformService);
  if (!platformBrowser.checkPlatFormBrowser()) {
    return next(req);
  }
  req = req.clone({
    setHeaders: {
      token: localStorage.getItem('userToken') || '',
    },
  });
  return next(req);
};
