import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import bcrypt from 'bcryptjs'
import { AuthService } from '../../services/login.service';
@Component({
  selector: 'app-create-account',
  imports: [MatInputModule, MatButtonModule, MatIcon, RouterLink, ReactiveFormsModule],
  templateUrl: './create-account.html',
  styleUrl: './create-account.scss'
})
export class CreateAccount {
  validationMessage = '';
  createUserForm = new FormGroup({
    name: new FormControl(''),
    last_name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    document_id: new FormControl(''),
    password: new FormControl('')
  })
  authService = inject(AuthService);

  isFormValid(){
    return true;
  }

  async printForm(){
    const salt = bcrypt.genSaltSync(10)
    const password = this.createUserForm.get('password')?.value ?? '';
    if(!password){
      return;
    }
    console.log(this.createUserForm.value);
    console.log('crypted password', await bcrypt.hash(password, salt))
  }

  async createUser(form: any){
   const {password, ...fields} = form;
  //  const cryptedPassword = await this.cryptPassword(password);
   const isUserCreated = this.authService.createUser(form).subscribe(res => {
    console.log(isUserCreated, 'was user created')
   });
  }

  async cryptPassword(password: string): Promise<string>{
    if(!password){
      return 'no password found';
    }
    const salt = bcrypt.genSaltSync(10)
    const newPassword = await bcrypt.hash(password, salt);
    return newPassword;
    console.log('newPassword', newPassword);
  }
}
