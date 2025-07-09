import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Auth } from './auth/auth';

const routes: Routes = [
  {
    path: '',
    component: Auth,
    children: [
      {path: 'login', component: Login},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
