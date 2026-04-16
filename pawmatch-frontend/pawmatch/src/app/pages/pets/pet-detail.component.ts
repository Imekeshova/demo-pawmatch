import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from '../../models/pet.model';
import { HealthRecord } from '../../models/health-record.model';
import { Reminder } from '../../models/reminder.model';
import { PetService } from '../../core/services/pet.service';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {
  pet: Pet | null = null;
  healthRecords: HealthRecord[] = [];
  reminders: Reminder[] = [];
  activeTab: 'health' | 'reminders' = 'health';
  isLoading = false;

  // Health form
  showHealthForm = false;
  editingRecord: HealthRecord | null = null;
  healthForm = { recordType: 'vaccination' as HealthRecord['recordType'], title: '', description: '', date: '', nextDueDate: '' };

  // Reminder form
  showReminderForm = false;
  editingReminder: Reminder | null = null;
  reminderForm = { title: '', dateTime: '' };

  constructor(private route: ActivatedRoute, private petService: PetService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPetData(id);
  }

  private loadPetData(id: number): void {
    this.isLoading = true;
    this.petService.getPets().subscribe({
      next: (pets) => {
        this.pet = pets.find(p => p.id === id) ?? null;
        this.isLoading = false;
        if (this.pet) {
          this.loadHealthRecords();
          this.loadReminders();
        }
      },
      error: () => { this.isLoading = false; }
    });
  }

  loadHealthRecords(): void {
    if (!this.pet) return;
    this.petService.getHealthRecords(this.pet.id).subscribe({
      next: (data) => { this.healthRecords = data; }
    });
  }

  loadReminders(): void {
    if (!this.pet) return;
    this.petService.getReminders(this.pet.id).subscribe({
      next: (data) => { this.reminders = data; }
    });
  }

  // ── Tab ─────────────────────────────────────────────────────
  setTab(tab: 'health' | 'reminders'): void {
    this.activeTab = tab;
    this.showHealthForm = false;
    this.showReminderForm = false;
  }

  // ── Health Records ──────────────────────────────────────────
  // click event 3 — открыть форму добавления
  openAddHealth(): void {
    this.editingRecord = null;
    this.healthForm = { recordType: 'vaccination', title: '', description: '', date: '', nextDueDate: '' };
    this.showHealthForm = true;
  }

  // click event 4 — редактировать запись
  onEditRecord(record: HealthRecord): void {
    this.editingRecord = record;
    this.healthForm = {
      recordType: record.recordType,
      title: record.title,
      description: record.description,
      date: record.date,
      nextDueDate: record.nextDueDate ?? ''
    };
    this.showHealthForm = true;
  }

  // click event 5 — удалить запись
  onDeleteRecord(record: HealthRecord): void {
    if (!confirm(`Удалить запись «${record.title}»?`)) return;
    this.petService.deleteHealthRecord(record.id).subscribe({
      next: () => { this.loadHealthRecords(); }
    });
  }

  submitHealthForm(): void {
    if (!this.pet) return;
    const payload: Partial<HealthRecord> = {
      pet: this.pet.id,
      ...this.healthForm,
      nextDueDate: this.healthForm.nextDueDate || undefined
    };

    const obs = this.editingRecord
      ? this.petService.updateHealthRecord(this.editingRecord.id, payload)
      : this.petService.createHealthRecord(payload);

    obs.subscribe({
      next: () => {
        this.showHealthForm = false;
        this.loadHealthRecords();
      }
    });
  }

  // ── Reminders ───────────────────────────────────────────────
  openAddReminder(): void {
    this.editingReminder = null;
    this.reminderForm = { title: '', dateTime: '' };
    this.showReminderForm = true;
  }

  // click event 6 — отметить выполненным
  onToggleReminder(reminder: Reminder): void {
    this.petService.updateReminder(reminder.id, { isCompleted: !reminder.isCompleted }).subscribe({
      next: () => { this.loadReminders(); }
    });
  }

  // click event 7 — удалить напоминание
  onDeleteReminder(reminder: Reminder): void {
    if (!confirm(`Удалить напоминание «${reminder.title}»?`)) return;
    this.petService.deleteReminder(reminder.id).subscribe({
      next: () => { this.loadReminders(); }
    });
  }

  submitReminderForm(): void {
    if (!this.pet) return;
    const payload: Partial<Reminder> = { pet: this.pet.id, ...this.reminderForm };

    const obs = this.editingReminder
      ? this.petService.updateReminder(this.editingReminder.id, payload)
      : this.petService.createReminder(payload);

    obs.subscribe({
      next: () => {
        this.showReminderForm = false;
        this.loadReminders();
      }
    });
  }

  getRecordIcon(type: string): string {
    const map: Record<string, string> = { vaccination: '💉', medication: '💊', checkup: '🩺' };
    return map[type] ?? '📋';
  }

  getRecordLabel(type: string): string {
    const map: Record<string, string> = { vaccination: 'Прививка', medication: 'Лечение', checkup: 'Осмотр' };
    return map[type] ?? type;
  }

  cancelForms(): void {
    this.showHealthForm = false;
    this.showReminderForm = false;
  }
}
