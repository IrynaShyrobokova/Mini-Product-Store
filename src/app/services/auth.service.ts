import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://your-api-url.com/login';
  private loggedIn = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.http.post<any>(this.apiUrl, payload).pipe(
      tap(() => this.loggedIn = true) // Set loggedIn to true on successful login
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
    // You can also clear tokens or session data here if needed
  }
}
