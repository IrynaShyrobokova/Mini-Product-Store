import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('token'); // Example check for a token
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/']); // Redirect to home if not authenticated
      return false;
    }
  }
}
