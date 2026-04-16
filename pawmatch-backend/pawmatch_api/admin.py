from django.contrib import admin
from .models import Shelter, Animal, Swipe, Match, Pet, HealthRecord, Reminder


@admin.register(Shelter)
class ShelterAdmin(admin.ModelAdmin):
    list_display = ['name', 'address', 'phone']


@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display  = ['name', 'species', 'breed', 'age', 'shelter', 'is_vaccinated', 'is_neutered', 'is_adopted']
    list_filter   = ['species', 'is_adopted', 'is_vaccinated']
    search_fields = ['name', 'breed']


@admin.register(Swipe)
class SwipeAdmin(admin.ModelAdmin):
    list_display = ['user', 'animal', 'is_like', 'created_at']


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ['user', 'animal', 'created_at']


@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'animal', 'birth_date', 'weight']


@admin.register(HealthRecord)
class HealthRecordAdmin(admin.ModelAdmin):
    list_display = ['title', 'pet', 'record_type', 'date', 'next_due_date']


@admin.register(Reminder)
class ReminderAdmin(admin.ModelAdmin):
    list_display = ['title', 'pet', 'date_time', 'is_completed']
