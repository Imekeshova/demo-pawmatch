export interface Reminder {
  id: number;
  pet: number;
  title: string;
  dateTime: string;     // ISO datetime
  isCompleted: boolean;
}
