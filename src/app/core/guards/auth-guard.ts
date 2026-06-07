import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { stored_Keys } from '../constants/storedKeys';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const plat_id = inject(PLATFORM_ID);

  if (isPlatformBrowser(plat_id)) {
    const token = localStorage.getItem(stored_Keys.userToken);
    if (token) {
      return true;
    } else {
      return router.parseUrl('/login');
    }
  }
  return true;
};
