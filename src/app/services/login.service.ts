import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, of } from 'rxjs';

export interface LoginResponse{
  error?: boolean;
  message?: any;
  token?: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }
  private http = inject(HttpClient)
  baseUrl = environment.baseUrl;

  handleLogin(formData: any): Observable<LoginResponse>{
    return this.http.post(`${this.baseUrl}/auth/login`, formData).pipe(
    catchError(err => {
      return of({ error: true, message: err.error });
    }));
  }

  isAuthenticated(){
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  sendRecoveryEmail(email: string | null): Observable<LoginResponse>{
    return this.http.post(`${this.baseUrl}/auth/forgot-password`, {emailTo: email}).pipe(
      catchError(err => {
        return of(err);
      })
    )
  }
}
