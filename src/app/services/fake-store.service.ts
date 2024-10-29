import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = new Subject<string | undefined>();

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return this.user.asObservable();
  }

  login(userName: string) {
    this.user.next(userName);
  }

  logout() {
    this.user.next(undefined);
  }

  getAllUsersFromMDB() {
    return this.http.get('https://reqres.in/api/users')
      .pipe(map((res: any) => res.data));
  }
}
