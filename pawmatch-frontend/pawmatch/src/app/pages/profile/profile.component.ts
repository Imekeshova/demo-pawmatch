import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private auth: AuthService, private api: ApiService) {}

  ngOnInit(): void {
    // Если бэкенд предоставляет /api/me/ — загружаем, иначе показываем заглушку
    this.api.get<User>('/me/').subscribe({
      next: (u) => { this.user = u; },
      error: () => {
        // Fallback: достать username из токена payload (если есть)
        this.user = { id: 0, username: 'Пользователь', email: '' };
      }
    });
  }

  onLogout(): void {
    this.auth.logout();
  }
}
