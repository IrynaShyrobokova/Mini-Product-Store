import { Component, OnInit } from '@angular/core';
import { FakeStoreService } from './services/fake-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true
})
export class AppComponent implements OnInit {
  products: any[] = [];
  users: any[] = [];

  constructor(private fakeStoreService: FakeStoreService) { }

  ngOnInit(): void {
    // Fetch products
    this.fakeStoreService.getAllProducts().subscribe((data) => {
      this.products = data;
    });

    // Fetch users
    this.fakeStoreService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  addProduct() {
    const newProduct = {
      title: 'New Product',
      price: 29.99,
      description: 'This is a new product',
      image: 'https://via.placeholder.com/150',
      category: 'electronics'
    };

    this.fakeStoreService.addProduct(newProduct).subscribe((data) => {
      console.log('Product added:', data);
    });
  }
}
