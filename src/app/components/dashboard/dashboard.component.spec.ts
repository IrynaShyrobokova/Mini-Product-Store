import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { UsersService } from '../../services/user.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  const mockUsers = [
    { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' },
    { id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com' }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UsersService', ['getAllUsers']);

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: UsersService, useValue: spy }
      ]
    }).compileComponents();

    usersServiceSpy = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on initialization', () => {
    usersServiceSpy.getAllUsers.and.returnValue(of(mockUsers));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.users).toEqual(mockUsers);
    expect(component.errorMessage).toBeNull();
    expect(usersServiceSpy.getAllUsers).toHaveBeenCalled();
  });

  it('should display an error message if loading users fails', () => {
    const errorResponse = new Error('Network error');
    usersServiceSpy.getAllUsers.and.returnValue(throwError(() => errorResponse));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.users).toEqual([]);
    expect(component.errorMessage).toBe('Failed to load users');
    expect(usersServiceSpy.getAllUsers).toHaveBeenCalled();
  });

  it('should not display any users if the users array is empty', () => {
    usersServiceSpy.getAllUsers.and.returnValue(of([]));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.users.length).toBe(0);
    expect(component.errorMessage).toBeNull();
  });
});
