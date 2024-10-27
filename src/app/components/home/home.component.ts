import { Component, OnInit } from '@angular/core';
import { FakeStoreService } from '../../services/fake-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  users: any[] = [];

  constructor(private fakeStoreService: FakeStoreService) { }

  ngOnInit(): void {
    // Fetch products
    this.fakeStoreService.getAllProducts().subscribe((data) => {
      this.products = data;
    });

    // Fetch users
    this.fakeStoreService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
