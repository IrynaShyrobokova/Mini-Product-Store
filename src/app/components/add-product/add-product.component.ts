import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  users: Observable<any[]> = of([]);
  isLoggedIn$: Observable<string | null>;

  product = {
    title: '',
    price: null,
    category: '',
    description: '',
    image: '' 
  };

  constructor(private authService: AuthService, private productService: ProductService) {
    this.isLoggedIn$ = this.authService.currentUser$; 
  }

  ngOnInit(): void { }

  onSubmit() {
    this.productService.addProduct(this.product).subscribe(
      response => {
        console.log('Product added:', response);
        // Optionally reset the form or navigate elsewhere
        this.product = { title: '', price: null, category: '', description: '', image: '' };
      },
      error => {
        console.error('Error adding product:', error);
      }
    );
  }
}
