import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getCartItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  proceedToCheckout() {
      if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Navigate to the checkout page
    this.router.navigate(['/checkout-shipping']); 
  }

  updateCart() {
  }

  calculateSubtotal(): number {
    const subtotal = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return subtotal.toFixed(2);
  }
}
