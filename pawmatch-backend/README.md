# 🐾 PawMatch — Django Backend

REST API на Django + DRF + JWT для приложения PawMatch.

## Быстрый старт

```bash
cd pawmatch-backend

# 1. Создать виртуальное окружение
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

# 2. Установить зависимости
pip install -r requirements.txt

# 3. Применить миграции
python manage.py migrate

# 4. Заполнить тестовыми данными
python seed.py

# 5. Запустить сервер
python manage.py runserver
```

Сервер: http://localhost:8000
Админка: http://localhost:8000/admin  (admin / admin123)

## Эндпоинты

| Метод | URL | Описание |
|---|---|---|
| POST | /api/token/ | Логин → JWT токены |
| POST | /api/token/refresh/ | Обновить токен |
| POST | /api/register/ | Регистрация |
| GET | /api/me/ | Текущий пользователь |
| GET | /api/swipe-cards/ | Карточки для свайпа |
| POST | /api/swipe/ | Отправить свайп |
| GET | /api/matches/ | Список матчей |
| GET/POST | /api/pets/ | Питомцы |
| GET/PUT/DELETE | /api/pets/:id/ | Питомец по id |
| GET/POST | /api/health-records/ | Медзаписи |
| GET/PUT/DELETE | /api/health-records/:id/ | Медзапись по id |
| GET/POST | /api/reminders/ | Напоминания |
| GET/PUT/DELETE | /api/reminders/:id/ | Напоминание по id |
