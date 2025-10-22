import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthRequest } from '../models/auth-request';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { RegisterResponse } from '../models/register-response';
import { RegisterRequest } from '../models/register-request';
import { isTokenValid, getTokenRemainingTime, shouldRefreshToken } from '../utils/jwt-utils';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = environment.serverUrls.host + "Auth/";
  
  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.url + "login", authRequest);
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
      // TODO: Implement token refresh logic here if your backend supports it
    }
    
    return true;
  }
  
  /**
   * Clears the user session and redirects to login
   */
  clearSession(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
  
  /**
   * Logs out the user and redirects to login page
   */
  logout(): void {
    this.clearSession();
    this.router.navigate(['/auth']);
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
}
