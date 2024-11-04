import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() product: any;
  message: string | null = null;

  constructor(private cartService: CartService) { }

  addToCart() {
    console.log('Add to Cart clicked');
    this.cartService.addToCart(this.product);
  }
}
