import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  imports: [MatInputModule, MatButtonModule, MatIconModule, RouterLink, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword {
  loginService = inject(LoginService);
  email =  new FormControl('');
  recoveryEmailFailed = false;
  emailSendSuccesfully = false;
  errorMessage = '';
  handleRecoveryEmail(){
    const response = this.loginService.sendRecoveryEmail(this.email.value).subscribe(res => {
      console.log(res, 'response')
      if(res.error){
        this.recoveryEmailFailed = true;
        this.emailSendSuccesfully = false;
        this.errorMessage = `Couldn't send the recovery email`;
        return;
      }
      this.errorMessage = res.message;
      this.recoveryEmailFailed = false;
      this.emailSendSuccesfully = true;
    });
    console.log('email', this.email.value);
  }
}
