import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { PlatformService } from '../../services/platform/platform.service';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let toasterService: ToastrService = inject(ToastrService);
  let platformService: PlatformService = inject(PlatformService);
  if (!platformService.checkPlatFormBrowser()) {
    return next(req);
  }
  return next(req).pipe(
    catchError((err) => {
      toasterService.error(err.error.message);
      return throwError(() => err);
    })
  );
};
