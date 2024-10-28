import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  template: `
    <h2>Products</h2>
    <div *ngFor="let product of products">
      <p>{{ product.title }}</p>
      <p>{{ product.price }}</p>
    </div>
  `
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://fakestoreapi.com/products')
      .subscribe(data => this.products = data as any[]);
  }
}
