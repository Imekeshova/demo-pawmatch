import { Component, OnInit } from '@angular/core';
import { Animal } from '../../models/animal.model';
import { SwipeService } from '../../core/services/swipe.service';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css']
})
export class SwipeComponent implements OnInit {
  animals: Animal[] = [];
  currentIndex = 0;
  isLoading = false;
  matchNotification = '';
  swipeDirection: 'left' | 'right' | '' = '';

  constructor(private swipeService: SwipeService) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.isLoading = true;
    this.swipeService.getSwipeCards().subscribe({
      next: (data) => {
        this.animals = data;
        this.currentIndex = 0;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  get currentAnimal(): Animal | null {
    return this.animals[this.currentIndex] ?? null;
  }

  get progressWidth(): number {
    if (!this.animals.length) return 0;
    return Math.round(((this.currentIndex) / this.animals.length) * 100);
  }

  // click event 1 — лайк
  onLike(): void {
    this.onSwipe(true);
  }

  // click event 2 — дизлайк
  onDislike(): void {
    this.onSwipe(false);
  }

  onSwipe(isLike: boolean): void {
    const animal = this.currentAnimal;
    if (!animal) return;

    this.swipeDirection = isLike ? 'right' : 'left';

    setTimeout(() => {
      this.swipeService.sendSwipe(animal.id, isLike).subscribe({
        next: (res) => {
          if (res.status === 'matched') {
            this.matchNotification = `💕 Взаимная симпатия с ${animal.name}!`;
            setTimeout(() => this.matchNotification = '', 3500);
          }
          this.nextCard();
        },
        error: () => { this.nextCard(); }
      });
    }, 300);
  }

  private nextCard(): void {
    this.swipeDirection = '';
    if (this.currentIndex < this.animals.length - 1) {
      this.currentIndex++;
    } else {
      this.animals = [];
    }
  }

  getSpeciesEmoji(species: string): string {
    return species === 'cat' ? '🐱' : '🐶';
  }
}
