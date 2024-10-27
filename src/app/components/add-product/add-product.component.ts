import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FakeStoreService } from '../../services/fake-store.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private fakeStoreService: FakeStoreService) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['https://via.placeholder.com/150'], // Default image URL
      category: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.fakeStoreService.addProduct(this.productForm.value).subscribe((response) => {
        console.log('Product added:', response);
      });
    }
  }
}
