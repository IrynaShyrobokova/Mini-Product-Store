// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {
    // Load cart items from local storage if available (optional)
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      //this.cartItems = JSON.parse(storedCart);
    }
  }

  addToCart(product: any) {
    this.cartItems.push({ ...product, quantity: 1 });
    window.alert(`${product.title} was added to the cart!`);
    console.log('Add to Cart in CartService clicked');
    this.updateLocalStorage();
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.updateLocalStorage();
  }

  clearCart() {
    this.cartItems = [];
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
