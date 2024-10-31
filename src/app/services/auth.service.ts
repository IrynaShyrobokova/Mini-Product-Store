import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInStatus = false;

  constructor() { }

  login() {
    this.isLoggedInStatus = true;
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    this.isLoggedInStatus = false;
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus || localStorage.getItem('isLoggedIn') === 'true';
  }
}
