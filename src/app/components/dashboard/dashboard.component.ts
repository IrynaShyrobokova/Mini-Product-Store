import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Observable, of, BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users$: Observable<any[]> = of([]);
  filteredUsers$!: Observable<any[]>;
  isLoggedIn$: Observable<string | null>;

  private searchTerm = new BehaviorSubject<string>(''); // Holds the search term

  usersService = inject(UsersService);
  authService = inject(AuthService);

  constructor() {
    this.isLoggedIn$ = this.authService.currentUser$;
  }

  ngOnInit() {
    this.users$ = this.usersService.getAllUsers();

    // Combine the users$ observable and searchTerm observable to filter the users
    this.filteredUsers$ = combineLatest([this.users$, this.searchTerm]).pipe(
      map(([users, term]) =>
        users.filter(user =>
          `${user.first_name} ${user.last_name}`.toLowerCase().includes(term.toLowerCase()) ||
          user.email.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const term = input?.value || '';
    this.searchTerm.next(term); 
  }
}
