import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private itemsInCartSubject = new BehaviorSubject<any[]>(this.cartItems);
  itemsInCart$ = this.itemsInCartSubject.asObservable(); 

  constructor(private authService: AuthService) { }

  addToCart(product: any) {
    console.log('Is user logged in?', this.authService.isLoggedIn());
    if (!this.authService.isLoggedIn()) {
      window.alert('Please log in to add items to the cart.');
      return;
    }
    this.cartItems.push({ ...product, quantity: 1 });
    window.alert(`${product.title} was added to the cart!`);
    this.updateLocalStorage();
    this.itemsInCartSubject.next(this.cartItems); // Emit updated cart items
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.updateLocalStorage();
    this.itemsInCartSubject.next(this.cartItems); // Emit updated cart items
  }

  clearCart() {
    this.cartItems = [];
    this.updateLocalStorage();
    this.itemsInCartSubject.next(this.cartItems); // Emit updated cart items
  }

  private updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
