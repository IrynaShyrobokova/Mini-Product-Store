import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() close = new EventEmitter<void>(); // Output event to close the form
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form with empty fields and validators
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void { }

  // Method called on form submission
  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (isSuccess) => {
        if (isSuccess) {
          this.router.navigate(['/home']);
        } else {
          this.loginError = 'Login failed. Please try again.';
        }
      },
      error: (err) => {
        this.loginError = 'An error occurred. Please try again later.';
        console.error('Login failed', err);
      }
    });
  }

  // Method to close the login form
  onClose() {
    this.close.emit();
  }
}
