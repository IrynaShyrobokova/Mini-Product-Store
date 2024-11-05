import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-shipping',
  templateUrl: './checkout-shipping.component.html',
  styleUrls: ['./checkout-shipping.component.css']
})
export class ShippingComponent implements OnInit {
  shippingForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
  }

  proceedToPayment() {
    if (this.shippingForm.valid) {
      // Logic to proceed
      this.router.navigate(['/checkout-payment']);
    } else {
      this.shippingForm.markAllAsTouched(); // Highlight errors if form is invalid
    }
  }

  closeShippingForm() {
    this.router.navigate(['/cart']); // Navigate back to cart or previous page
  }
}
