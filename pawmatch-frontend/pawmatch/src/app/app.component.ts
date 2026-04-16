import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showNav = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Показываем навигацию только на защищённых маршрутах
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      const hiddenRoutes = ['/login', '/register'];
      this.showNav = !hiddenRoutes.includes(e.urlAfterRedirects);
    });
  }

  get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  onLogout(): void {
    this.auth.logout();
  }
}
