export interface HealthRecord {
  id: number;
  pet: number;
  recordType: 'vaccination' | 'medication' | 'checkup';
  title: string;
  description: string;
  date: string;         // YYYY-MM-DD
  nextDueDate?: string;
}
