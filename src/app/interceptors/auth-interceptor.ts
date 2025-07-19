import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {};

    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let pathname = window.location.pathname;
    headers['pathname'] = pathname;

    req = req.clone({
      setHeaders: headers,
    });
  }
  return next(req);
};
