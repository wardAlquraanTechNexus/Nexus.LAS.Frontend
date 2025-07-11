import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../models/auth-request';
import { environment } from '../../environment/environment.prod';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';

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
  getCompany(){
    return this.httpClient.get("https://localhost:44325/api/Countries")
  }

   saveSession(data: AuthResponse) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
  }
}
