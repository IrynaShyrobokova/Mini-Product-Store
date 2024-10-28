import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  template: `
    <h2>Your Cart</h2>
    <div *ngFor="let item of cartItems">
      <p>{{ item.title }} - {{ item.price }}</p>
    </div>
  `
})
export class CartComponent {
  cartItems = [
    // Add logic to manage items in the cart
  ];
}
