import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly apiUrl = 'https://reqres.in/api/users';
  private http = inject(HttpClient);

  getAllUsers(): Observable<User[]> {
    return this.http.get<{ data: User[] }>(this.apiUrl).pipe(
      map((res) => res.data)
    );
  }

  searchAndFilter(char: string): Observable<User[]> {
    return this.getAllUsers().pipe(
      map((users) =>
        users.filter((user) =>
          user.first_name.toLowerCase().startsWith(char.toLowerCase())
        )
      )
    );
  }
}
