import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-forgot-password',
  imports: [MatInputModule, MatButtonModule, MatIconModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword {
  loginService = inject(LoginService);
  form = new FormGroup({
  email: new FormControl('')
  })
  isMessageActive = false;
  hasErrors = false;
  response !: {message: string; type: 'success' | 'error'};
  isLoaderActive = false;

  constructor() {
  this.form.valueChanges.subscribe(value => {
    if (!value.email || value.email === '') {
      this.response = { message: '', type: 'error' };
    }
  })
  // this.email.valueChanges.subscribe(value => {

  // });
}

handleRecoveryEmail(e?: any){
  const email = this.form.get('email');
  if(e){
    e.preventDefault();
  }
    if(this.form.get('email')?.value === ''){
      this.setResponseMessage('Enter a valid email', 'error');
      return;
    }

    if(!email){
      this.setResponseMessage('Enter a valid email', 'error');
      return;
    }
    this.isLoaderActive = true;
    this.loginService.sendRecoveryEmail(email.value).subscribe({
      next: (res: any) => {
          if(!res.error){
            this.isLoaderActive = false;
            this.setResponseMessage(res.message, 'success');
            return;
          }
          this.isLoaderActive = false;
          this.setResponseMessage(res.error.message, 'error');
        },
        error: (err) => {
          this.setResponseMessage('There was an error sending the email, try again later', 'error');
          this.isLoaderActive = false;
        }
    })
  }

  getInputValue(e: any){
    return (e.target as HTMLInputElement).value;
  }

  showMessage(){
    return (
    this.response &&
    !this.isLoaderActive &&
    this.response.message !== ''
  );
  }

  setResponseMessage(message: string, type: 'success' | 'error'){
    this.response = {
      message,
      type
    }
  }
}
