import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, of } from 'rxjs';

export interface LoginResponse{
  error?: boolean;
  message?: any;
  token?: string;
}

export interface CreateUser{
  name: string;
  last_name: string;
  phone: string;
  email: string;
  document_id: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  createUser(form: CreateUser ){
    return this.http.post(`${this.baseUrl}/auth/users`, form).pipe(
      catchError(err => {
        return of(err);
      })
    )
  }
}
