import { Animal } from './animal.model';

export interface Match {
  id: number;
  animal: Animal;
  createdAt: string;
}
