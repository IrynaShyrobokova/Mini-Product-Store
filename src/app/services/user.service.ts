import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  http = inject(HttpClient);

  getAllUsers() {
    return this.http.get('https://reqres.in/api/users').pipe(
      map((res: any) => res.data)
    );
  }

  searchAndFilter(char: string) {
    return this.getAllUsers().pipe(
      map((users: any) =>
        users.filter((user: any) =>
          user.first_name.toLowerCase().startsWith(char.toLowerCase())
        )
      )
    );
  }
}
