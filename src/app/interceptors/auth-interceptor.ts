import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isTokenValid } from '../utils/jwt-utils';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {};

    // Only add token if it's valid
    if (token && isTokenValid(token)) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (token) {
      // Token exists but is invalid/expired
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Don't redirect for auth endpoints
      if (!req.url.includes('/Auth/')) {
        router.navigate(['/auth']);
      }
    }

    let pathname = window.location.pathname;
    headers['pathname'] = pathname;

    req = req.clone({
      setHeaders: headers,
    });
  }
  return next(req);
};
