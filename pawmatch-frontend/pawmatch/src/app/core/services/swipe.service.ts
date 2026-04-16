import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Animal } from '../../models/animal.model';
import { SwipeResponse } from '../../models/swipe.model';
import { Match } from '../../models/match.model';

@Injectable({ providedIn: 'root' })
export class SwipeService {
  constructor(private api: ApiService) {}

  getSwipeCards(): Observable<Animal[]> {
    return this.api.get<Animal[]>('/swipe-cards/');
  }

  sendSwipe(animalId: number, isLike: boolean): Observable<SwipeResponse> {
    return this.api.post<SwipeResponse>('/swipe/', { animal_id: animalId, is_like: isLike });
  }

  getMatches(): Observable<Match[]> {
    return this.api.get<Match[]>('/matches/');
  }
}
