// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn!: Observable<string | undefined>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
  }

  onLogin(): void {
    this.userService.login('ADMIN_USER');
  }

  onLogout(): void {
    this.userService.logout();
  }
}
