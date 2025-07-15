import { Component, inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../services/login.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatFormField, MatInputModule, MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})

export class Login implements OnInit{
  authService = inject(AuthService);
  router = inject(Router);
  loginFailed = false;
  loginFailMessage = '';
  loginForm = new FormGroup({
    email: new FormControl(''),
    password : new FormControl('')
  })
  ngOnInit(): void {
  }

  getFormData(){
    console.log(this.loginForm.value, 'formData');
  }

  onEmailInputChange(e: any){
    const emailInputValue = (e.target as HTMLInputElement).value;
    if(emailInputValue.length === 0) this.loginFailed = false;
  }

  login(formData: any){
    this.authService.handleLogin(formData).subscribe({
      next: res => {
        if(!res.error && res.token){
          this.router.navigate(['/dashboard']);
          localStorage.setItem('access_token', res.token);
          console.log('Login exitoso:', res);
          return;
        }
        this.loginFailed = true;
        this.loginFailMessage = 'Invalid user or password';
      }
    });
  }
}
