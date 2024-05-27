import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const anyLoggedGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let authService = inject(AuthService);

  if(authService.isLoggedIn()){
    return true;
  } else {
    return router.navigate(['/login']);
  }
};