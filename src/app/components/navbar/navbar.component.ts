import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUser: string | null = null;
  isLoginModalOpen = false;
  public authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.closeLogin(); 
      }
    });
  }

  openLogin() {
    this.isLoginModalOpen = true;
  }

  closeLogin() {
    this.isLoginModalOpen = false;
  }

  logout() {
    this.authService.logout();
    this.closeLogin(); 
  }
}
