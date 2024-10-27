import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeStoreService {
  private baseUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/products`, product);
  }
}
