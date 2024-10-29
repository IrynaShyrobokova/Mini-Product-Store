// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = new Subject<string | undefined>();

  constructor(private http: HttpClient) { }

  isLoggedIn(): Observable<string | undefined> {
    return this.user.asObservable();
  }

  login(userName: string): void {
    this.user.next(userName);
  }

  logout(): void {
    this.user.next(undefined);
  }

  getAllUsersFromMDB(): Observable<any> {
    return this.http.get('https://reqres.in/api/users')
      .pipe(map((res: any) => res.data));
  }
}
