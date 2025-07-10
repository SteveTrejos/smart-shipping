import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const isAuthenticated = loginService.isAuthenticated();
  if(!isAuthenticated){
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
