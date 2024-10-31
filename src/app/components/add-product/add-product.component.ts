import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product = {
    title: '',       // String type for title
    price: 0,        // Number type for price
    description: '', // String type for description
    image: '',       // String type for image
    category: ''     // String type for category
  };
  constructor(private productService: ProductService, private router: Router) { }

  addProduct() {
    this.productService.addProduct(this.product).subscribe({
      next: (data) => {
        console.log('Product added:', data);
        this.router.navigate(['/']);
      },
      error: (error) => console.error(error),
    });
  }
}
