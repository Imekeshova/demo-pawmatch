import { Animal } from './animal.model';

export interface Pet {
  id: number;
  animal: Animal;
  name: string;
  birthDate: string;
  weight: number;
}
