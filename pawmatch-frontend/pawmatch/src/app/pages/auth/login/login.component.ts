import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMsg = 'Заполните все поля 🐾';
      return;
    }
    this.isLoading = true;
    this.errorMsg = '';

    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/swipe']);
      },
      error: (err: Error) => {
        this.isLoading = false;
        this.errorMsg = err.message;
      }
    });
  }
}
