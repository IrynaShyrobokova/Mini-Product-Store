import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

// Define the LoginResponse interface
interface LoginResponse {
  success: boolean;
  user?: string; // Optional, based on API response
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://your-api-url.com/login';
  private loggedIn = false;
  private currentUser: string | null = null;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>(this.apiUrl, { username, password }).pipe(
      tap((response: LoginResponse) => {
        console.log(response);
        if (response.success) {
          this.loggedIn = true;
          this.currentUser = response.user || username; 
        } else {
          this.loggedIn = false;
        }
      }),
      map(response => response.success)
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }

  logout(): void {
    this.loggedIn = false;
    this.currentUser = null;
  }
}
