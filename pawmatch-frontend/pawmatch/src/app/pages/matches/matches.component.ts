import { Component, OnInit } from '@angular/core';
import { Match } from '../../models/match.model';
import { SwipeService } from '../../core/services/swipe.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: Match[] = [];
  isLoading = false;

  constructor(private swipeService: SwipeService) {}

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches(): void {
    this.isLoading = true;
    this.swipeService.getMatches().subscribe({
      next: (data) => {
        this.matches = data;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  // click event — связаться с приютом
  onContact(match: Match): void {
    alert(`🐾 Свяжитесь с приютом, чтобы усыновить ${match.animal.name}!\nПозвоните или напишите приюту напрямую.`);
  }

  getSpeciesEmoji(species: string): string {
    return species === 'cat' ? '🐱' : '🐶';
  }

  getTimeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now  = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 86400000);
    if (diff === 0) return 'Сегодня';
    if (diff === 1) return 'Вчера';
    return `${diff} дн. назад`;
  }
}
