# Rails JWT Demo — Frontend

React + TypeScript frontend for a JWT-authenticated todo app. Pairs with the [Rails backend](https://github.com/anthonylee1994/rails-jwt-demo).

## Tech Stack

- **React 19** + **TypeScript** — UI
- **Vite** — dev server & bundler
- **Chakra UI v3** — component library
- **Zustand** — client state management
- **Axios** — HTTP client with JWT interceptor

## Features

- Register / login with username & password
- JWT stored in `localStorage`; auto-attached to every request via Axios interceptor
- Auto-logout on `401` response
- Todo list: create, rename, toggle complete, delete
- Per-user tasks (scoped by JWT identity)

## Getting Started

```bash
pnpm install
```

Copy `.env.example` to `.env.local` and set your backend URL:

```env
VITE_API_URL=http://localhost:3000
```

```bash
pnpm dev
```

## Project Structure

```
src/
├── api/
│   └── apiClient.ts      # Axios instance + error helper
├── components/
│   ├── AuthPage.tsx       # Login / register form
│   ├── TodoPage.tsx       # Task list view
│   └── TaskItem.tsx       # Individual task row
├── stores/
│   ├── authStore.ts       # Auth state + JWT logic
│   └── taskStore.ts       # Task CRUD state
├── types/
│   └── Task.ts            # Task interface
└── app.tsx                # Root — routes between auth / todo
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Type-check + build for production |
| `pnpm preview` | Preview production build |
| `pnpm format` | Format with Prettier |
