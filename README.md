# Rails JWT Demo — Frontend

React + TypeScript frontend for a JWT-authenticated todo app. It pairs with the [Rails backend](https://github.com/anthonylee1994/rails-jwt-demo).

Live demo: https://lane.on99.app/

## Tech Stack

- **React 19** + **TypeScript** - UI
- **Vite** - dev server and production build
- **Zustand** - auth and task state
- **Axios** - API client with JWT request/response handling
- **React Router** - single-page routing and fallback redirects
- **React Icons** - UI icons
- **Tailwind CSS v4** - responsive Lane-style auth and task UI

## Features

- Register and login with username/password
- Store JWT in `localStorage`
- Attach `Authorization: Bearer <token>` to authenticated API requests
- Refresh the saved token from an `Authorization` response header when the backend sends one
- Auto-logout when an authenticated request receives `401 Unauthorized`
- Per-user todo list scoped by JWT identity
- Create, rename, complete/uncomplete, and delete tasks
- Filter tasks by all, active, or completed
- Responsive auth and todo screens

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create `.env.local` and point it at the Rails API:

```env
VITE_API_URL=http://localhost:3000
```

Start the Vite dev server:

```bash
pnpm dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Backend Notes

The Rails API needs to allow the frontend origin through CORS.

If the backend returns refreshed JWTs in the `Authorization` response header, expose that header so the browser lets Axios read it:

```rb
resource "*",
  headers: :any,
  expose: ["Authorization"],
  methods: [:get, :post, :put, :patch, :delete, :options, :head]
```

Axios normalizes response header keys to lowercase, so the frontend reads `response.headers.authorization`.

## Project Structure

```
src/
├── api/
│   └── apiClient.ts             # Axios instance, JWT interceptors, error helper
├── components/
│   ├── auth/
│   │   ├── AuthForm.tsx         # Login/register form controls
│   │   └── BrandPanel.tsx       # Auth page brand panel
│   ├── lane/
│   │   ├── Modal.tsx            # Shared modal shell
│   │   ├── atoms.tsx            # Shared UI primitives
│   │   ├── classes.ts           # Shared Tailwind class strings (buttons, inputs, nav…)
│   │   └── icons.tsx            # Inline UI icons
│   └── todo/
│       ├── EditTaskModal.tsx    # Rename, complete, and delete task modal
│       ├── EmptyState.tsx       # Empty task list prompt
│       ├── ErrorCard.tsx        # Load failure card
│       ├── LoadingState.tsx     # Initial loading state
│       ├── LogoutDialog.tsx     # Logout confirmation modal
│       ├── NewTaskModal.tsx     # New task form modal
│       ├── Sidebar.tsx          # Desktop filters, counts, and account actions
│       └── TaskRow.tsx          # Individual task row
├── pages/
│   ├── AuthPage.tsx             # Auth screen
│   └── TodoPage.tsx             # Todo screen
├── styles/
│   └── tailwind.css             # Tailwind entry + Lane design tokens (@theme)
├── stores/
│   ├── authStore.ts             # Auth state and JWT login/logout logic
│   └── taskStore.ts             # Task CRUD state
├── types/
│   ├── Task.ts                  # Task interface
│   └── TaskFilter.ts            # Todo filter type
├── app.tsx                       # Root auth/todo switch
└── main.tsx                      # React entrypoint
```

## Scripts

| Command        | Description                       |
| -------------- | --------------------------------- |
| `pnpm dev`     | Start dev server                  |
| `pnpm build`   | Type-check + build for production |
| `pnpm lint`    | Run ESLint                        |
| `pnpm preview` | Preview production build          |
| `pnpm format`  | Format with Prettier              |
