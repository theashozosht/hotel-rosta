import { CanActivateFn, Router } from '@angular/router';
import { StaticName } from '../constants/static-name';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const sessionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const platForm = inject(PLATFORM_ID);
  if (isPlatformBrowser(platForm)) {
    const sessionFromStorage = localStorage.getItem(StaticName.localStorage.session)
    if (sessionFromStorage ) {
      return true
    }
    else {
      router.navigate(['/auth/login'])
      return false
    }
  } else {
    return true
  }
};

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platForm = inject(PLATFORM_ID);
  if (isPlatformBrowser(platForm)) {
    const sessionFromStorage = localStorage.getItem(StaticName.localStorage.session)
    if (sessionFromStorage) {
      router.navigate(['/dashboard/home'])
      return false
    }
    else
      return true
  } else {
    return true;
  }
}