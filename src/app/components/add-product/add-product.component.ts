import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  template: `
    <h2>Add New Product</h2>
`
})
export class AddProductComponent {
  product = { title: '', price: 0 };

  constructor(private http: HttpClient) { }

  addProduct() {
    this.http.post('https://fakestoreapi.com/products', this.product)
      .subscribe(response => console.log('Product added:', response));
  }
}
