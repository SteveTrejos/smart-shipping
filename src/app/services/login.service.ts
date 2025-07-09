import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, of } from 'rxjs';

export interface LoginResponse{
  error?: boolean;
  message?: any
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  private http = inject(HttpClient)
  baseUrl = environment.baseUrl;

  printBaseUrl(){
    console.log(this.baseUrl);
  }

  handleLogin(formData: any): Observable<LoginResponse>{
    return this.http.post(`${this.baseUrl}/auth/login`, formData).pipe(
    catchError(err => {
      return of({ error: true, message: err.error });
    }));
  }
}
