import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  addToCart(item: any) {
    this.cartItems.push(item);
  }

  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
  }

  getCartItems() {
    return this.cartItems;
  }
}
