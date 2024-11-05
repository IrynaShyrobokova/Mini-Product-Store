import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';

import { FormsModule } from '@angular/forms';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ShippingComponent } from './components/checkout-shipping/checkout-shipping.component';
import { PaymentComponent } from './components/checkout-payment/checkout-payment.component';
import { SummaryComponent } from './components/checkout-summary/checkout-summary.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    CartComponent,
    ProductComponent,
    AddProductComponent,
    ShippingComponent,
    PaymentComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
