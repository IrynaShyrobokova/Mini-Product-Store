// auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send login request and set isAuthenticated to true on success', () => {
    const mockResponse = { success: true };
    const username = 'testuser';
    const password = 'password123';

    service.login(username, password).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(service.isLoggedIn()).toBeTrue();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, password });
    req.flush(mockResponse);
  });

  it('should handle login error and set isAuthenticated to false', () => {
    const username = 'testuser';
    const password = 'wrongpassword';

    service.login(username, password).subscribe((response) => {
      expect(response).toBeNull();
      expect(service.isLoggedIn()).toBeFalse();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/login`);
    expect(req.request.method).toBe('POST');
    req.flush('Login failed', { status: 401, statusText: 'Unauthorized' });
  });

  it('should set isAuthenticated to false on logout', () => {
    // Set isAuthenticated to true initially
    service['isAuthenticated'] = true;

    service.logout();

    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should return correct isLoggedIn status', () => {
    service['isAuthenticated'] = true;
    expect(service.isLoggedIn()).toBeTrue();

    service['isAuthenticated'] = false;
    expect(service.isLoggedIn()).toBeFalse();
  });
});
