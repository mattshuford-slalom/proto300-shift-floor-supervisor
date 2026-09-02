# PLAN: Shift Floor Supervisor Mobile App

## Tech Stack
- Vue 3 (Composition API)
- Vuetify 3, mobile-breakpoint-first
- Pinia for state
- Mock JSON data, simulated shift/line context

## Information Architecture
- `v-bottom-navigation`: Work Orders / Safety / Handoff
- Single-column mobile layout throughout — no persistent sidebar

## Component Structure
- `AppShell.vue` — `v-app-bar` with shift/line selector + bottom nav
- `WorkOrdersView.vue`
  - `WorkOrderCard.vue` — status chip, line, due time
  - `StatusFilterChips.vue`
- `SafetyChecklistView.vue`
  - `ChecklistSection.vue` — grouped items with `v-checkbox`
  - `ChecklistProgressBar.vue`
- `HandoffNotesView.vue`
  - `IncomingNotesPanel.vue` — read-only, prior shift's notes
  - `OutgoingNoteForm.vue` — textarea + quick-tag chips
- `IssueFlagSheet.vue` — `v-bottom-sheet` for quick issue reporting

## Data Model (mock)
- `workOrders.json` — id, line, status, priority, dueTime
- `checklist.json` — shiftId, section, items[] (label, checked, required)
- `handoffNotes.json` — shiftId, fromSupervisor, toSupervisor, notes, tags[]
- `issues.json` — id, category, description, timestamp, status

## Visual System
- **Typography**: larger base size for arm's-length readability
  (`text-body-1` minimum, `text-h6` for card titles)
- **Spacing**: 16px grid; minimum 48px tap target height per Vuetify
  touch guidance
- **Color**: high-contrast status system — blocked = `error`,
  in-progress = `warning`, complete = `success`
- **Layout**: single column, sticky bottom nav, max 2 levels of
  navigation depth

## Build Phases
1. Scaffold mobile shell + bottom nav
2. Mock data layer + Pinia store
3. Work Orders view
4. Safety Checklist view
5. Handoff Notes view + issue flag sheet
6. Touch-target and responsive polish pass

## Milestones
- **M1** — Bottom nav shell navigable on mobile viewport
- **M2** — Work orders + safety checklist functional with mock data
- **M3** — Handoff notes and issue flagging complete
