import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // 4 form controls через [(ngModel)]
  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  errorMsg = '';
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    // Валидация
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.errorMsg = 'Заполните все поля 🐾';
      return;
    }
    if (!this.email.includes('@')) {
      this.errorMsg = 'Введите корректный email 📧';
      return;
    }
    if (this.password.length < 6) {
      this.errorMsg = 'Пароль должен содержать минимум 6 символов 🔑';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Пароли не совпадают 😿';
      return;
    }

    this.isLoading = true;
    this.errorMsg = '';

    this.auth.register({
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
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
