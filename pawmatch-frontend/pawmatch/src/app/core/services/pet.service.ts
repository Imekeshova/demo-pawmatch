import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Pet } from '../../models/pet.model';
import { HealthRecord } from '../../models/health-record.model';
import { Reminder } from '../../models/reminder.model';

@Injectable({ providedIn: 'root' })
export class PetService {
  constructor(private api: ApiService) {}

  // ── Pets ──────────────────────────────────────────────────────────────────
  getPets(): Observable<Pet[]> {
    return this.api.get<Pet[]>('/pets/');
  }

  createPet(petData: Partial<Pet>): Observable<Pet> {
    return this.api.post<Pet>('/pets/', petData);
  }

  updatePet(id: number, petData: Partial<Pet>): Observable<Pet> {
    return this.api.put<Pet>(`/pets/${id}/`, petData);
  }

  deletePet(id: number): Observable<void> {
    return this.api.delete<void>(`/pets/${id}/`);
  }

  // ── Health Records ────────────────────────────────────────────────────────
  getHealthRecords(petId: number): Observable<HealthRecord[]> {
    return this.api.get<HealthRecord[]>(`/health-records/?pet_id=${petId}`);
  }

  createHealthRecord(record: Partial<HealthRecord>): Observable<HealthRecord> {
    return this.api.post<HealthRecord>('/health-records/', record);
  }

  updateHealthRecord(id: number, record: Partial<HealthRecord>): Observable<HealthRecord> {
    return this.api.put<HealthRecord>(`/health-records/${id}/`, record);
  }

  deleteHealthRecord(id: number): Observable<void> {
    return this.api.delete<void>(`/health-records/${id}/`);
  }

  // ── Reminders ─────────────────────────────────────────────────────────────
  getReminders(petId: number): Observable<Reminder[]> {
    return this.api.get<Reminder[]>(`/reminders/?pet_id=${petId}`);
  }

  createReminder(reminder: Partial<Reminder>): Observable<Reminder> {
    return this.api.post<Reminder>('/reminders/', reminder);
  }

  updateReminder(id: number, reminder: Partial<Reminder>): Observable<Reminder> {
    return this.api.put<Reminder>(`/reminders/${id}/`, reminder);
  }

  deleteReminder(id: number): Observable<void> {
    return this.api.delete<void>(`/reminders/${id}/`);
  }
}
