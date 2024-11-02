import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUser: string | null = null;
  @Output() loginClick = new EventEmitter<void>();
  isLoginModalOpen = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  // Optional: Add method to refresh current user if it changes dynamically
  refreshUser() {
    this.currentUser = this.authService.getCurrentUser();
  }

  // Define the openLogin method if it should trigger the login modal
  openLogin() {
    this.isLoginModalOpen = true;
  }

  closeLogin() {
    this.isLoginModalOpen = false;
  }

  onLoginClick() {
    this.loginClick.emit();
  }
}
