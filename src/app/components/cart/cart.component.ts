import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',  
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: any[];

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getCartItems(); // Refresh the cart items
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }
}
