import { Component, OnInit } from '@angular/core';
import { FakeStoreService } from '../../services/fake-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];

  constructor(private fakeStoreService: FakeStoreService) { }

  ngOnInit(): void {
    this.fakeStoreService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
