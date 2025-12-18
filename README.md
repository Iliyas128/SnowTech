# SnowTEch

## Project info

SnowTEch — фронтенд‑приложение на базе Vite + React + TypeScript + shadcn-ui + Tailwind CSS.

## Как запустить проект локально

Требуется установленный Node.js и npm (рекомендуется установка через nvm: [github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
# 1. Клонируйте репозиторий
git clone <YOUR_GIT_URL>

# 2. Перейдите в папку проекта
cd SnowTEch

# 3. Установите зависимости
npm install

# 4. Запустите dev-сервер
npm run dev
```

Приложение по умолчанию поднимается на `http://localhost:8080` (см. `vite.config.ts`).

## Технологии

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Сборка и деплой

- **Сборка production-версии**: `npm run build`
- **Локальный предпросмотр собранной версии**: `npm run preview`

Полученную папку `dist` можно раздавать с любого статического хостинга (Vercel, Netlify, Cloudflare Pages и т.п.).
