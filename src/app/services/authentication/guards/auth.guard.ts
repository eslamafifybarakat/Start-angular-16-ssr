// auth.guard.ts
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    const isAuthenticated: boolean = this.authService.isLoggedIn();

    if (url.includes('/Auth')) {
      if (isAuthenticated) {
        this.router.navigate(['/Dashboard/Statistics']);
        return false;
      }
      return true;
    }

    if (isAuthenticated) {
      return true;
    }

    this.router.navigate(['/Auth/Login']);
    return false;
  }
}

// canActivate Method: This method is called by the Angular router to determine if a route can be activated. It takes two parameters:

// next: The target route that is being activated.
// state: The state of the router at the moment of the route activation.
// Inside this method:

// The current URL is stored in the url property.
// The isAuthenticated variable is set based on the isLoggedIn method of the AuthService. This is a placeholder for your actual authentication logic.
// If the user is authenticated (isAuthenticated is true), the authState method is called. Otherwise, the notAuthState method is called.
// checkIsAuthPages Method: This method checks if the current URL includes '/Auth', indicating it's an authentication-related page.

// authState Method: If the user is on an authentication page (determined by checkIsAuthPages), they are redirected to the '/Dashboard' route. Otherwise, true is returned, indicating the user can access the current route.

// notAuthState Method: If the user is on an authentication page, true is returned, allowing access. Otherwise, the user is redirected to the '/Auth' route and false is returned, preventing access to the current route.

