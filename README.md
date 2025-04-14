# ВидеоМонтаж Про - Портфолио

Портфолио для демонстрации работ по видеомонтажу с галереей видео, информацией о мастере и контактами.

## Оглавление

- [Установка](#установка)
- [Разработка](#разработка)
- [Сборка](#сборка)
- [Деплой](#деплой)
- [Структура проекта](#структура-проекта)
- [Редактирование содержимого](#редактирование-содержимого)

## Установка

Проект можно установить с использованием бандлера Bun (рекомендуется) или NPM.

### С использованием Bun

```bash
# Установка Bun (если еще не установлен)
curl -fsSL https://bun.sh/install | bash

# Установка зависимостей
cd video-portfolio
bun install
```

### С использованием NPM

```bash
# Установка зависимостей
cd video-portfolio
npm install
```

## Разработка

### Запуск сервера разработки

С использованием Bun:

```bash
bun run dev
```

С использованием NPM:

```bash
npm run dev
```

После запуска сервер будет доступен по адресу [http://localhost:3000](http://localhost:3000).

## Сборка

### Создание продакшн-сборки

С использованием Bun:

```bash
bun run build
```

С использованием NPM:

```bash
npm run build
```

Результаты сборки будут находиться в директории `out`.

## Деплой

### На Netlify

1. Зарегистрируйтесь на [Netlify](https://www.netlify.com/)
2. Используйте один из способов:

   **Автоматический деплой через GitHub:**

   - Загрузите проект на GitHub
   - В Netlify выберите "New site from Git"
   - Выберите ваш репозиторий
   - Все настройки уже заданы в файле `netlify.toml`
   - Нажмите "Deploy site"

   **Ручной деплой:**

   - Выполните сборку проекта: `bun run build`
   - В Netlify выберите "Sites" -> "Add new site" -> "Deploy manually"
   - Перетащите директорию `out` в область загрузки

### На другой хостинг

Загрузите содержимое папки `out` на ваш хостинг через FTP или другой метод, поддерживаемый вашим хостингом.

## Структура проекта

```
video-portfolio/
├── public/              # Статические файлы (изображения, фавиконки)
│   └── images/          # Изображения видео и фоны
├── src/                 # Исходный код
│   ├── app/             # Next.js App Router
│   │   ├── globals.css  # Глобальные стили
│   │   ├── layout.tsx   # Общий макет приложения
│   │   └── page.tsx     # Главная страница
├── next.config.js       # Конфигурация Next.js
├── netlify.toml         # Конфигурация для Netlify
├── package.json         # Зависимости и скрипты
└── tsconfig.json        # Конфигурация TypeScript
```

## Редактирование содержимого

### Замена видео и изображений

1. Добавьте ваши изображения/превью для видео в папку `public/images/`
2. Откройте файл `src/app/page.tsx`
3. Найдите массив `videoSamples` и замените пути к изображениям и описания

```typescript
const videoSamples = [
  {
    id: 1,
    title: "Ваше название видео",
    description: "Описание видео",
    category: "Категория",
    duration: "0:45",
    thumbnail: "/images/ваше-изображение.jpg",
    url: "ссылка-на-видео-если-есть"
  },
  // ... другие видео
];
```

### Изменение личной информации

В файле `src/app/page.tsx` найдите раздел "О себе" и отредактируйте текст:

```jsx
{/* Секция "О себе" */}
<div className="glass-card mb-8 p-6 md:p-8">
  <h2 className="text-2xl md:text-3xl font-semibold mb-6">О себе</h2>

  <div className="flex flex-col md:flex-row gap-8">
    <div className="md:w-2/3">
      <p className="text-gray-200 mb-4">
        Измените этот текст на информацию о себе...
      </p>
      {/* ... Другие параграфы */}
    </div>

    {/* ... */}
  </div>
</div>
```

### Изменение контактной информации

Найдите раздел "Контакты" и обновите ссылки:

```jsx
<a
  href="https://t.me/your_username" // <- измените на ваш username в Telegram
  target="_blank"
  rel="noopener noreferrer"
  className="telegram-button"
>
  <Send className="w-5 h-5" />
  <span>Связаться в Telegram</span>
</a>

<a
  href="mailto:your_email@example.com" // <- измените на вашу почту
  className="email-button flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all"
>
  <Mail className="w-5 h-5" />
  <span>Написать на Email</span>
</a>
```

## Лицензия

MIT
