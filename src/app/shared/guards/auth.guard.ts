import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  
  const loogedInUserRole = authService.userRole;
  const { roles } = route.data;
  if (loogedInUserRole) {
    // check if route is restricted by role
    if (roles && !roles.includes(loogedInUserRole)) {
      router.navigate(['/']);
      return false;
    }

    return true;
  }

  // not logged in so redirect to login page with the return url
  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  authService.authSatusListenner.next(false);
  return false;
};
