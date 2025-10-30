import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthRequest } from '../models/auth-request';
import { environment } from '../../environment/environment';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { RegisterResponse } from '../models/register-response';
import { RegisterRequest } from '../models/register-request';
import { isTokenValid, getTokenRemainingTime, shouldRefreshToken } from '../utils/jwt-utils';
import { Router } from '@angular/router';
import { tap, catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = environment.serverUrls.host + "Auth/";
  
  // Track refresh state to prevent multiple simultaneous refresh calls
  public isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { }

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  refreshToken(): Observable<AuthResponse> {
    if (this.isRefreshing) {
      // If already refreshing, return the existing observable
      return this.refreshTokenSubject.asObservable();
    }

    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this.httpClient.post<AuthResponse>(this.url + "RefreshToken", {}, { withCredentials: true })
      .pipe(
        tap((response: AuthResponse) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response);
          this.saveSession(response);
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(null);
          // If refresh fails, clear session and redirect to login
          this.clearSession();
          this.router.navigate(['/auth']);
          return throwError(() => error);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
  }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.url + "login", authRequest, { withCredentials: true })
      .pipe(
        tap((response: AuthResponse) => {
          this.saveSession(response);
        })
      );
  }

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(this.url + "register", registerRequest);
  }

  saveSession(data: AuthResponse) {
    if (this.isBrowser) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
    }
  }

  /**
   * Checks if the current authentication is valid
   * @returns true if authenticated and token is valid
   */
  checkAuth(): boolean {
    if (!this.isBrowser) {
      return false;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    // Validate token
    if (!isTokenValid(token)) {
      this.clearSession();
      return false;
    }

    // Check if token needs refresh
    if (shouldRefreshToken(token)) {
      console.warn('Token expiring soon. Time remaining:', getTokenRemainingTime(token), 'seconds');
      // Auto-refresh if not already refreshing
      if (!this.isRefreshing) {
        this.refreshToken().subscribe({
          next: (res) => {
            console.log('Token refreshed successfully');
          },
          error: (err) => {
            console.error('Failed to refresh token:', err);
          }
        });
      }
    }

    return true;
  }

  /**
   * Clears the user session (HttpOnly cookies are handled by backend)
   */
  clearSession(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    
    // Reset refresh state
    this.isRefreshing = false;
    this.refreshTokenSubject.next(null);
    
    // Note: HttpOnly cookies cannot be removed from frontend
    // They will be cleared by the backend logout endpoint
  }

  /**
   * Logs out the user and calls backend to clear HttpOnly cookies
   */
  logout(): void {
    // Call backend logout endpoint to clear HttpOnly refresh token cookie
    this.httpClient.post(this.url + "logout", {}, { withCredentials: true })
      .subscribe({
        complete: () => {
          this.clearSession();
          this.router.navigate(['/auth']);
        },
        error: () => {
          // Even if logout fails, clear local session
          this.clearSession();
          this.router.navigate(['/auth']);
        }
      });
  }

  /**
   * Gets the current token if valid
   * @returns token string or null
   */
  getValidToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }

    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
      return token;
    }

    // Clear invalid token
    if (token) {
      this.clearSession();
    }

    return null;
  }

  getUser(): AuthResponse | null {
    if (!this.isBrowser) {
      return null; // Return null during SSR
    }

    const userJson = localStorage.getItem('user');
    if (!userJson) return null;

    try {
      return JSON.parse(userJson) as AuthResponse;
    } catch (e) {
      return null;
    }
  }

  /**
   * Test refresh token functionality
   */
  testRefreshToken(): void {
    console.log('Testing refresh token call...');
    this.refreshToken().subscribe({
      next: (response) => {
        console.log('✅ Refresh token call successful:', response);
      },
      error: (error) => {
        console.log('❌ Refresh token call failed:', error);
      }
    });
  }
}
