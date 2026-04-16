"""
Скрипт для заполнения базы тестовыми данными.
Запуск: python seed.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pawmatch_backend.settings')
django.setup()

from django.contrib.auth.models import User
from pawmatch_api.models import Shelter, Animal

# ── Суперпользователь для админки ─────────────────────────────────────────────
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('✅ Суперпользователь: admin / admin123')

# ── Тестовый обычный пользователь ─────────────────────────────────────────────
if not User.objects.filter(username='testuser').exists():
    User.objects.create_user('testuser', 'test@example.com', 'test1234')
    print('✅ Тестовый пользователь: testuser / test1234')

# ── Приют ─────────────────────────────────────────────────────────────────────
shelter, _ = Shelter.objects.get_or_create(
    name='Приют «Пушистый дом»',
    defaults={'address': 'г. Москва, ул. Животных, д.1', 'phone': '+7 (999) 123-45-67'}
)
print(f'✅ Приют: {shelter.name}')

# ── Животные с реальными фото (placekitten / placedog) ───────────────────────
animals_data = [
    dict(name='Мурка',   species='cat', breed='Британская',     age=2, photo_url='https://placekitten.com/400/400', is_vaccinated=True,  is_neutered=True),
    dict(name='Барсик',  species='cat', breed='Сибирская',      age=3, photo_url='https://placekitten.com/401/401', is_vaccinated=True,  is_neutered=False),
    dict(name='Рыжик',   species='cat', breed='Беспородная',    age=1, photo_url='https://placekitten.com/402/402', is_vaccinated=False, is_neutered=False),
    dict(name='Белла',   species='cat', breed='Персидская',     age=4, photo_url='https://placekitten.com/403/403', is_vaccinated=True,  is_neutered=True),
    dict(name='Шарик',   species='dog', breed='Лабрадор',       age=2, photo_url='https://placedog.net/400/400',   is_vaccinated=True,  is_neutered=False),
    dict(name='Бобик',   species='dog', breed='Дворняга',       age=5, photo_url='https://placedog.net/401/401',   is_vaccinated=True,  is_neutered=True),
    dict(name='Рекс',    species='dog', breed='Немецкая овчарка', age=3, photo_url='https://placedog.net/402/402', is_vaccinated=True,  is_neutered=False),
    dict(name='Люся',    species='dog', breed='Спаниель',       age=1, photo_url='https://placedog.net/403/403',   is_vaccinated=False, is_neutered=False),
    dict(name='Снежок',  species='cat', breed='Ангорская',      age=2, photo_url='https://placekitten.com/405/405', is_vaccinated=True, is_neutered=True),
    dict(name='Тузик',   species='dog', breed='Мопс',           age=4, photo_url='https://placedog.net/405/405',   is_vaccinated=True,  is_neutered=True),
]

for data in animals_data:
    obj, created = Animal.objects.get_or_create(
        name=data['name'], shelter=shelter,
        defaults=data
    )
    if created:
        print(f'  🐾 Добавлено: {obj.name} ({obj.species})')

print('\n🎉 База данных заполнена! Можно запускать сервер.')
print('   Админка: http://localhost:8000/admin  (admin / admin123)')
