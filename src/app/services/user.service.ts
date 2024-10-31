import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const API_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'https://your-api-url.com/users'; 

  getAllUsers(): Observable<any> {
    return this.http.get(`${API_URL}/users`);
  }

  // Add the addUser method
  addUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, newUser);
  }

  // Implement getUserById
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  // Method to update a user
  updateUser(updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${updatedUser.id}`, updatedUser);
  }

  // Method to delete a user by ID
  deleteUser(userId: number): Observable<null> {
    return this.http.delete<null>(`${this.apiUrl}/${userId}`);
  }
}
