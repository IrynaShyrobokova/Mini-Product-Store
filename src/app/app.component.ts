import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Mark as standalone
  imports: [RouterModule], // Import RouterModule for routing
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/add-product">Add Product</a>
      <a routerLink="/cart">Cart</a>
      <a routerLink="/dashboard">Dashboard</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent { }
