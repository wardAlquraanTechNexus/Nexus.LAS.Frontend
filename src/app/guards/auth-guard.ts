import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { isTokenValid, shouldRefreshToken } from '../utils/jwt-utils';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const authService = inject(AuthService);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');

    // Check if token exists and is valid
    if (token && isTokenValid(token)) {
      // Optional: Log warning if token needs refresh soon
      if (shouldRefreshToken(token)) {
        console.warn('Token will expire soon. Consider refreshing.');
        
        // Check if refresh is already in progress
        if (!authService.isRefreshing) {
          authService.refreshToken().subscribe({
            next: (res) => {
              authService.saveSession(res);
            }
          });
        }
      }
      return true;
    }

    // Clear invalid token from storage
    if (token && !isTokenValid(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.error('Token is invalid or expired. Please login again.');
    }
  }

  // Redirect to auth page with return URL
  return router.createUrlTree(['/auth'], {
    queryParams: { returnUrl: state.url }
  });
};
