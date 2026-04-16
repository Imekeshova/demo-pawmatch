import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../core/services/pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  pets: Pet[] = [];
  isLoading = false;

  constructor(private petService: PetService, private router: Router) {}

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.isLoading = true;
    this.petService.getPets().subscribe({
      next: (data) => {
        this.pets = data;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  // click event — перейти на детальную страницу питомца
  onPetClick(pet: Pet): void {
    this.router.navigate(['/pets', pet.id]);
  }

  getSpeciesEmoji(species: string): string {
    return species === 'cat' ? '🐱' : '🐶';
  }
}
