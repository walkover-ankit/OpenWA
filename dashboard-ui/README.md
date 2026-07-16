# OpenWA Dashboard UI (fork)

Standalone React dashboard for OpenWA. **No files are shared with `dashboard/`** — this is a full copy maintained separately.

Design and layout follow the reference in `sample/OpenWA Dashboard.html` (same stack: React 19, Vite, TypeScript, TanStack Query, i18n, Recharts).

## Custom changes (vs upstream `dashboard/`)

- **Nav:** Chats and Infrastructure hidden (routes removed; page code kept)
- **Dashboard:** Connected-session KPIs, gateway-recorded labels, chart zero-fill, by-session chart, full list pagination
- **Sessions:** Hide session ID when disconnected; prefer WhatsApp `pushName` as display name
- **Templates:** Variable add/insert/remove UI with preview
- **API Keys:** Usage and expires columns
- **Logs:** CSV export uses backend page size (200)

## Run locally

```bash
# From repo root (API + this UI on :2887)
npm run dashboard-ui:install
npm run dev:ui

# Or UI only (proxies API on :2785)
cd dashboard-ui && npm install && npm run dev
```

- **UI:** http://localhost:2887  
- **API:** http://localhost:2785  

## Build

```bash
npm run dashboard-ui:build
```

Output: `dashboard-ui/dist/` (not served by Nest by default; use Vite preview or your own static host).

## Original dashboard

The stock OpenWA dashboard remains in `dashboard/` (port **2886**, `npm run dashboard:dev`).
