import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  url:string = environment.serverUrls.host+"Auth/";
  constructor(private httpClient:HttpClient){
    
  }

  login(authRequest:AuthRequest):Observable<AuthResponse>
  {
    return this.httpClient.post<AuthResponse>(this.url+"login",authRequest);
  }

  register(registerRequest:RegisterRequest):Observable<RegisterResponse>
  {
    return this.httpClient.post<RegisterResponse>(this.url+"register",registerRequest);
  }
  

   saveSession(data: AuthResponse) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
  }
}
