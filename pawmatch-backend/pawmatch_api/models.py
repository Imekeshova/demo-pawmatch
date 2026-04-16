from django.db import models
from django.contrib.auth.models import User


class Shelter(models.Model):
    name    = models.CharField(max_length=200)
    address = models.TextField()
    phone   = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Animal(models.Model):
    SPECIES_CHOICES = [('dog', 'Собака'), ('cat', 'Кошка'), ('other', 'Другое')]

    shelter      = models.ForeignKey(Shelter, on_delete=models.CASCADE, related_name='animals')
    name         = models.CharField(max_length=100)
    species      = models.CharField(max_length=20, choices=SPECIES_CHOICES, default='dog')
    breed        = models.CharField(max_length=100)
    age          = models.PositiveIntegerField(default=1)          # лет
    photo        = models.ImageField(upload_to='animals/', blank=True, null=True)
    photo_url    = models.URLField(blank=True)                      # альтернатива файлу
    is_vaccinated = models.BooleanField(default=False)
    is_neutered   = models.BooleanField(default=False)
    is_adopted    = models.BooleanField(default=False)

    def likes_count(self):
        return Swipe.objects.filter(animal=self, is_like=True).count()

    def __str__(self):
        return f'{self.name} ({self.species})'


class Swipe(models.Model):
    user       = models.ForeignKey(User, on_delete=models.CASCADE, related_name='swipes')
    animal     = models.ForeignKey(Animal, on_delete=models.CASCADE, related_name='swipes')
    is_like    = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'animal')

    def __str__(self):
        action = '❤️' if self.is_like else '👎'
        return f'{self.user.username} {action} {self.animal.name}'


class Match(models.Model):
    user       = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matches')
    animal     = models.ForeignKey(Animal, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'animal')

    def __str__(self):
        return f'Match: {self.user.username} ↔ {self.animal.name}'


class Pet(models.Model):
    """Усыновлённый питомец пользователя."""
    user       = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pets')
    animal     = models.ForeignKey(Animal, on_delete=models.CASCADE)
    name       = models.CharField(max_length=100)
    birth_date = models.DateField()
    weight     = models.FloatField()

    def __str__(self):
        return f'{self.name} (хозяин: {self.user.username})'


class HealthRecord(models.Model):
    RECORD_TYPES = [
        ('vaccination', 'Прививка'),
        ('medication',  'Лечение'),
        ('checkup',     'Осмотр'),
    ]
    pet          = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='health_records')
    record_type  = models.CharField(max_length=20, choices=RECORD_TYPES)
    title        = models.CharField(max_length=200)
    description  = models.TextField(blank=True)
    date         = models.DateField()
    next_due_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f'{self.title} ({self.pet.name})'


class Reminder(models.Model):
    pet          = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='reminders')
    title        = models.CharField(max_length=200)
    date_time    = models.DateTimeField()
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.title} — {self.pet.name}'
