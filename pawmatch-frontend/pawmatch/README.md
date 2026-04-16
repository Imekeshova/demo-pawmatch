# 🐾 PawMatch — Angular 17+ Frontend

Веб-приложение для поиска и усыновления животных из приютов в стиле Tinder.
Розовый, милый, пушистый дизайн 💕

---

## 🚀 Быстрый старт

### 1. Установить Node.js (если не установлен)
Скачайте с https://nodejs.org (версия 18+ или 20+)

### 2. Установить Angular CLI глобально
```bash
npm install -g @angular/cli@17
```

### 3. Перейти в папку проекта
```bash
cd pawmatch
```

### 4. Установить зависимости
```bash
npm install
```

### 5. Запустить приложение
```bash
ng serve --open
# или
npm start
```

Приложение откроется по адресу: **http://localhost:4200**

---

## 🔧 Структура проекта

```
src/app/
├── core/
│   ├── interceptors/
│   │   └── auth.interceptor.ts       ← JWT-заголовок + обработка 401
│   ├── guards/
│   │   └── auth.guard.ts             ← Защита маршрутов
│   └── services/
│       ├── api.service.ts            ← Базовый HTTP-сервис
│       ├── auth.service.ts           ← Логин / выход / токен
│       ├── swipe.service.ts          ← Карточки свайпа + матчи
│       └── pet.service.ts            ← Питомцы / здоровье / напоминания
├── models/
│   ├── user.model.ts
│   ├── animal.model.ts
│   ├── swipe.model.ts
│   ├── match.model.ts
│   ├── pet.model.ts
│   ├── health-record.model.ts
│   └── reminder.model.ts
├── pages/
│   ├── auth/
│   │   ├── login/                    ← Вход (2 form controls)
│   │   └── register/                 ← Регистрация (4 form controls ✅)
│   ├── swipe/                        ← Главный свайп (лайк/дизлайк ✅)
│   ├── matches/                      ← Список матчей (@for ✅)
│   ├── pets/
│   │   ├── pet-list.component        ← Список питомцев (@for ✅)
│   │   └── pet-detail.component      ← Детали: вкладки здоровье/напоминания
│   └── profile/                      ← Профиль + кнопка выхода
├── app-routing.module.ts             ← 7 маршрутов (> 3 ✅)
├── app.module.ts
└── app.component.ts/html/css         ← Шапка + мобильная навигация
```

---

## ✅ Выполненные требования

| Требование                    | Где реализовано                                                                     |
|-------------------------------|-------------------------------------------------------------------------------------|
| **≥ 4 click events → API**    | Лайк, Дизлайк, Добавить/Удалить запись здоровья, Отметить/Удалить напоминание (7 штук) |
| **≥ 4 form controls [(ngModel)]** | RegisterComponent (4), HealthRecordForm (5), ReminderForm (2)                  |
| **Routing ≥ 3 маршрутов**     | login, register, swipe, matches, pets, pets/:id, profile (7 штук)                  |
| **@for и @if**                | Используются повсеместно во всех компонентах                                        |
| **JWT Interceptor**           | `auth.interceptor.ts` — добавляет Bearer, обрабатывает 401                          |
| **HttpClient сервис**         | `api.service.ts` — get/post/put/delete                                              |
| **Обработка ошибок**          | `catchError` в ApiService + сообщения в форме                                       |
| **AuthGuard**                 | Защищает swipe, matches, pets, profile                                              |
| **Анимация свайпа**           | CSS `transform + opacity` при swipe-left / swipe-right                              |
| **Toast уведомление матча**   | Всплывающее уведомление при `status: 'matched'`                                     |
| **Адаптивность**              | Header → BottomNav на мобильных, media-queries в CSS                                |

---

## ⚙️ Конфигурация бэкенда

Файл: `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
```

Убедитесь что бэкенд Django запущен на `localhost:8000` и разрешает CORS с `localhost:4200`.

---

## 🎨 Дизайн

- **Палитра:** розовый градиент `#e0529a → #c84b8c`, лавандовый `#b088c0`, кремовый `#fff8fc`
- **Шрифт:** Nunito (Google Fonts) — округлый и игривый
- **Компоненты:** карточки с `border-radius: 28px`, box-shadow в розовых тонах
- **Анимации:** bounce-логотип, spin-спиннер, slide-up появление форм, swipe-анимация карточки

---

## 🐛 Возможные проблемы

**`ng: command not found`** — установите Angular CLI:
```bash
npm install -g @angular/cli@17
```

**CORS ошибка** — добавьте в Django settings:
```python
CORS_ALLOWED_ORIGINS = ["http://localhost:4200"]
```

**Ошибка 401 на все запросы** — убедитесь что бэкенд принимает JWT (`Authorization: Bearer <token>`).
