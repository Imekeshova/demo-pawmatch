export interface Animal {
  id: number;
  shelter: number;
  name: string;
  species: string;   // 'dog' | 'cat'
  breed: string;
  age: number;
  photo: string;
  isVaccinated: boolean;
  isNeutered: boolean;
  isAdopted: boolean;
  likesCount: number;
}
