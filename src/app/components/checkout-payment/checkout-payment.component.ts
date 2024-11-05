import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  reviewOrder(): void {
    if (this.paymentForm.valid) {
      console.log('Reviewing order...');
      this.router.navigate(['/checkout-summary'])
    } else {
      console.log('Form is invalid');
    }
  }

  closePaymentForm(): void {
    this.router.navigate(['/cart']); // Navigate back to cart or another route
  }
}
