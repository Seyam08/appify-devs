## Admin Analytics Dashboard (Next.js + TypeScript)

Production-ready, responsive admin analytics dashboard using:

- Next.js (App Router)
- TypeScript
- Tailwind CSS + Shadcn UI patterns
- Redux Toolkit + React Redux
- Recharts
- Axios
- JSON Server mock API

### 1) Install plugins/packages

```bash
npm install
npm install @reduxjs/toolkit react-redux recharts axios json-server
```

### 2) Start JSON Server

```bash
npm run mock
```

This serves:

- `GET /stats`
- `GET /revenue`
- `GET /orders`
- `GET /users`
- `GET /traffic`

at `http://localhost:4000`.

### 3) Start Next.js app

```bash
npm run dev
```

If needed, override API URL:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000 npm run dev
```

## Folder structure

- `app/` – app router entry
- `components/dashboard/` – reusable dashboard layout + charts + filters
- `components/ui/` – shadcn-style reusable primitives
- `store/` – Redux store + slices + typed hooks
- `services/` – Axios client
- `types/` – shared TypeScript types
- `db.json` – JSON Server mock data

## Notes

- Includes skeleton loading states, empty state, and error state.
- Sidebar supports desktop collapse and mobile drawer.
- Filters (date range + user type) trigger Redux async fetch and chart/KPI updates.
- KPI cards include growth indicators with positive/negative visual styling.
