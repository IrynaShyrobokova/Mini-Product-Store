import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  constructor(private authService: AuthService) { }

  addToCart(product: any) {
    console.log('Is user logged in?', this.authService.isLoggedIn()); // Debugging line
    if (!this.authService.isLoggedIn()) {
      window.alert('Please log in to add items to the cart.');
      return;
    }
    this.cartItems.push({ ...product, quantity: 1 });
    window.alert(`${product.title} was added to the cart!`);
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
