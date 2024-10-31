import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule]  // For routing-related dependencies
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Initialize bindings
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title in the navbar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.navbar-brand')?.textContent).toContain('Your App Title');
  });

  it('should render navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('a.nav-link').length).toBeGreaterThan(0);
  });

  it('should have a home link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const homeLink = compiled.querySelector('a.nav-link[href="/home"]');
    expect(homeLink).toBeTruthy();
  });

  it('should call the logout method when logout button is clicked', () => {
    spyOn(component, 'logout');  // Spy on the logout method
    const button = fixture.debugElement.nativeElement.querySelector('button.logout-btn');
    button.click();  // Simulate button click
    expect(component.logout).toHaveBeenCalled();  // Check if logout method was called
  });
});
