import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

interface LoginResponse {
  token?: string; // ReqRes returns a token on successful login
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://reqres.in/api/login';
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        console.log('Login response:', response);
      }),
      map((response: LoginResponse) => {
        if (response.token) {
          this.setCurrentUser(email);
          localStorage.setItem('authToken', response.token);
          console.log('Token stored:', localStorage.getItem('authToken')); // Debugging line
          return true;
        } else {
          this.setCurrentUser(null);
          localStorage.removeItem('authToken');
          return false;
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        this.setCurrentUser(null);
        localStorage.removeItem('authToken');
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

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.setCurrentUser(null);
  }
}
