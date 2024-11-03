import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  isLoading = true;
  username: string | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe(username => {
      this.username = username;
      console.log('Home component:', this.username);
    });
    this.productService.getAllProducts().subscribe({
      next: (data: any[]) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (error: any) => console.error(error),
    });

    // Get the username if logged in, otherwise it will be null
    this.username = this.authService.getCurrentUser();
    console.log('Home component:', this.username);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
