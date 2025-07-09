import { Component, inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatFormField, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})

export class Login implements OnInit{
  loginService = inject(LoginService);
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

  login(formData: any){
    this.loginService.handleLogin(formData).subscribe({
      next: res => {
        if (res.error) {
            this.loginFailed = true;
            this.loginFailMessage = 'Invalid user or password';
        } else {
          this.router.navigate(['/dashboard']);
          console.log('Login exitoso:', res);
        }
      }
    });
  }
}
