import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'dashboard', component: DashboardComponent }
];
