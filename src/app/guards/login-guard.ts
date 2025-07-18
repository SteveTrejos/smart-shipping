import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/login.service';
import { inject } from '@angular/core';
export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authService.isAuthenticated();
  if(!isAuthenticated){
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
