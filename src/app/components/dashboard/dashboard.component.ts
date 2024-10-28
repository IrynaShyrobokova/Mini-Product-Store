import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  template: `
    <h2>Dashboard</h2>
    <p>Only visible to logged-in users</p>
    <div *ngFor="let user of users">
      <p>{{ user.name }}</p>
    </div>
  `
})
export class DashboardComponent {
  users: any[] = [];

  constructor(private http: HttpClient) {
    this.http.get('https://fakestoreapi.com/users')
      .subscribe(data => this.users = data as any[]);
  }
}
