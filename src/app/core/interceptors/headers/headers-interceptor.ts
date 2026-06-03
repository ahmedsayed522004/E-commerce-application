import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { stored_Keys } from '../../constants/storedKeys';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const plat_id = inject(PLATFORM_ID);
  if (isPlatformBrowser(plat_id)) {
    const token = localStorage.getItem(stored_Keys.userToken);

    if (token) {
      req = req.clone({
        setHeaders: {
          token: token,
        },
      });
    }
  }

  return next(req);
};
