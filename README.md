# Shift Floor Supervisor

Mobile-first Vue 3 + Vuetify 3 + Pinia app for manufacturing floor supervisors:
work order status board, per-shift safety checklist, shift handoff notes, and
quick issue flagging.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Features
- **Work Orders** — status board (blocked / in-progress / complete) with filter
  chips, progress, and one-tap status advance.
- **Safety Checklist** — grouped, glove-friendly checkboxes with live progress
  and required-item tracking.
- **Shift Handoff** — read-only incoming notes, outgoing note form with
  quick-add snippets and category tags, plus flagged-issue log.
- **Issue Flag** — bottom-sheet quick report reachable from any tab (FAB).
- **Dark / Light mode** toggle, persisted to `localStorage`.
- Shift / line context selector in the app bar.

Mock data lives in `src/data/`. State is managed by Pinia stores in
`src/stores/`.
