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
    title: '' as string,         
    price: null as number | null, 
    description: '' as string,
    image: '' as string,
    category: '' as string,
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
