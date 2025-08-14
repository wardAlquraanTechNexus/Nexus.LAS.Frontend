import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthRequest } from '../models/auth-request';
import { environment } from '../../environment/environment.prod';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { RegisterResponse } from '../models/register-response';
import { RegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = environment.serverUrls.host + "Auth/";
  
  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
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

  checkAuth() {

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
