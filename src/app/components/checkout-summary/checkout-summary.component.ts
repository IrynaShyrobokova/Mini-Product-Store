import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.css']
})
export class SummaryComponent implements OnInit {
  cartItems: any[] = [];
  subtotal: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateSubtotal();
  }

  calculateSubtotal(): void {
    this.subtotal = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  placeOrder(): void {
    alert('Order placed successfully!');
    this.cartService.clearCart();
    this.router.navigate(['/home']);
  }

  closeOrderSummary() {
    this.router.navigate(['/cart']);
  }
}
