import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users$: Observable<any[]> = of([]); 
  isLoggedIn$: Observable<string | null>;

  // Injecting services
  usersService = inject(UsersService);
  authService = inject(AuthService);

  constructor() {
    this.isLoggedIn$ = this.authService.currentUser$;
  }

  ngOnInit() {
    this.users$ = this.usersService.getAllUsers();
  }
}
