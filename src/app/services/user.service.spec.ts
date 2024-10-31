import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service'; 
import { User } from '../models/user.model';  

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a list of users', () => {
    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('https://api.example.com/users'); // Replace URL as needed
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch a user by ID', () => {
    const userId = 1;
    service.getUserById(userId).subscribe((user) => {
      expect(user).toEqual(mockUsers[0]);
    });

    const req = httpMock.expectOne(`https://api.example.com/users/${userId}`); // Replace URL as needed
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers[0]);
  });

  it('should add a new user', () => {
    const newUser: User = { id: 3, name: 'Sam Smith', email: 'sam@example.com' };

    service.addUser(newUser).subscribe((user) => {
      expect(user).toEqual(newUser);
    });

    const req = httpMock.expectOne('https://api.example.com/users'); // Replace URL as needed
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('should update an existing user', () => {
    const updatedUser: User = { id: 1, name: 'John Doe Updated', email: 'johnupdated@example.com' };

    service.updateUser(updatedUser).subscribe((user) => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`https://api.example.com/users/${updatedUser.id}`); // Replace URL as needed
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUser);
  });

  it('should delete a user by ID', () => {
    const userId = 1;

    service.deleteUser(userId).subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`https://api.example.com/users/${userId}`); // Replace URL as needed
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
