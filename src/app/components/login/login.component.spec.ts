import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,      // For routing-related dependencies
        HttpClientTestingModule,   // For HTTP-related dependencies
        FormsModule               // For ngModel and form handling
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Initialize bindings
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an initial empty username and password', () => {
    expect(component.username).toBe('');
    expect(component.password).toBe('');
  });

  it('should call login method on form submit', () => {
    spyOn(component, 'login');  // Spy on the login method
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();  // Simulate button click
    expect(component.login).toHaveBeenCalled();  // Check if login method was called
  });

  it('should render a form with username and password fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input[name="username"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="password"]')).toBeTruthy();
  });
});
