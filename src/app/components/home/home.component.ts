// home.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://fakestoreapi.com/products').subscribe((data: any) => {
      this.products = data;
    });
  }
}
