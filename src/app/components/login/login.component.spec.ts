import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with empty fields', () => {
    expect(component.loginForm.value).toEqual({ username: '', password: '' });
  });

  it('should display an error if the username is not provided', () => {
    const usernameControl = component.loginForm.get('username');
    usernameControl?.setValue('');
    usernameControl?.markAsTouched();
    fixture.detectChanges();

    const usernameError = fixture.nativeElement.querySelector('#username + .invalid-feedback');
    expect(usernameError.textContent).toContain('Username is required.');
  });

  it('should display an error if the password is not provided or too short', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('');
    passwordControl?.markAsTouched();
    fixture.detectChanges();

    const passwordError = fixture.nativeElement.querySelector('#password + .invalid-feedback');
    expect(passwordError.textContent).toContain('Password is required.');

    passwordControl?.setValue('123');
    fixture.detectChanges();

    const minlengthError = fixture.nativeElement.querySelector('#password + .invalid-feedback');
    expect(minlengthError.textContent).toContain('Password must be at least 6 characters.');
  });

  it('should call AuthService login method on form submission', () => {
    component.loginForm.setValue({ username: 'testuser', password: 'password123' });

    // Use `of(true)` to simulate a successful login response
    authServiceSpy.login.and.returnValue(of(true));

    component.onLogin();

    expect(authServiceSpy.login).toHaveBeenCalledWith('testuser', 'password123');
  });

  it('should navigate to the home page on successful login', () => {
    component.loginForm.setValue({ username: 'testuser', password: 'password123' });
    authServiceSpy.login.and.returnValue(of(true));

    component.onLogin();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should handle login error and log it to console', () => {
    spyOn(console, 'error');
    component.loginForm.setValue({ username: 'testuser', password: 'wrongpassword' });
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Login failed')));

    component.onLogin();

    expect(console.error).toHaveBeenCalledWith('Login failed', jasmine.any(Error));
  });
});
