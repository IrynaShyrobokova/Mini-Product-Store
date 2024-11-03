import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
    alert(`${this.product.name} added to cart!`);
  }
}
