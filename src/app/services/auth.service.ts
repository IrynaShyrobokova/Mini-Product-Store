import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { CartService } from './cart.service';

interface LoginResponse {
  token?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://reqres.in/api/login';
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenKey = 'authToken';
  private cartService: any;

  constructor(private http: HttpClient, private injector: Injector) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        console.log('Login response:', response);
      }),
      map((response: LoginResponse) => {
        if (response.token) {
          this.setCurrentUser(email);
          localStorage.setItem(this.tokenKey, response.token); 
          return true;
        } else {
          this.setCurrentUser(null);
          localStorage.removeItem(this.tokenKey);
          return false;
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        this.setCurrentUser(null);
        localStorage.removeItem(this.tokenKey);
        return of(false);
      })
    );
  }

  isLoggedIn(): boolean {
    const isLogged = !!localStorage.getItem(this.tokenKey);
    console.log('AuthService - isLoggedIn:', isLogged);
    return isLogged;
  }

  getCurrentUser() {
    console.log('getCurrentUser():', this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }

  setCurrentUser(email: string | null) {
    this.currentUserSubject.next(email);
    console.log('Current user set to:', email);
  }

  private getCartService() {
    if (!this.cartService) {
      this.cartService = this.injector.get(CartService); 
    }
    return this.cartService;
  }

  logout(): void {
    const cartService = this.getCartService();

    if (cartService.getCartItems().length > 0) {
      const confirmLogout = window.confirm(
        'You have items in your cart. Logging out will clear the cart. Do you want to proceed?'
      );

      if (!confirmLogout) {
        return;
      }
    }

    // Clear token and cart items if confirmed
    localStorage.removeItem(this.tokenKey);
    cartService.clearCart();
    this.setCurrentUser(null);
    console.log('User has been logged out and cart is cleared.');

    // Force page reload to update the view
    window.location.reload();
  }
}
