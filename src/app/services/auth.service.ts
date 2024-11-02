import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

interface LoginResponse {
  success: boolean;
  user?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://your-api-url.com/login';
  private loggedIn = false;
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        console.log('Login response:', response);
        if (response.success) {
          this.loggedIn = true;
          this.setCurrentUser(username);
        } else {
          this.loggedIn = false;
          this.setCurrentUser(null);
        }
      }),
      map(response => response.success),
      catchError(error => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setCurrentUser(username: string | null) {
    this.currentUserSubject.next(username);
  }

  getCurrentUser(): string | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    this.loggedIn = false;
    this.setCurrentUser(null);
  }
}
