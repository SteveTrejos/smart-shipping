import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Auth } from './auth/auth';
import { ForgotPassword } from './forgot-password/forgot-password';

const routes: Routes = [
  {
    path: '',
    component: Auth,
    children: [
      {path: 'login', component: Login},
      {path: 'forgot-password', component: ForgotPassword}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
