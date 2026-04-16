import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { AuthTokens, User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private TOKEN_KEY = 'pawmatch_access';
  private REFRESH_KEY = 'pawmatch_refresh';

  constructor(private api: ApiService, private router: Router) {}

  login(username: string, password: string): Observable<AuthTokens> {
    return this.api.post<AuthTokens>('/token/', { username, password }).pipe(
      tap(tokens => this.saveTokens(tokens))
    );
  }

  register(userData: { username: string; email: string; password: string }): Observable<AuthTokens> {
    return this.api.post<AuthTokens>('/register/', userData).pipe(
      tap(tokens => this.saveTokens(tokens))
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private saveTokens(tokens: AuthTokens): void {
    localStorage.setItem(this.TOKEN_KEY, tokens.access);
    localStorage.setItem(this.REFRESH_KEY, tokens.refresh);
  }
}
