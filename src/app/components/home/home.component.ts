import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  isLoading = true;

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (data: any[]) => {  // Explicit type for 'data' as an array
        this.products = data;
        this.isLoading = false;
      },
      error: (error: any) => console.error(error),  // Explicit type for 'error'
    });
  }


  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
