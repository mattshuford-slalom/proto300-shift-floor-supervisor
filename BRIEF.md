# BRIEF: Shift Floor Supervisor Mobile App

## Overview
A mobile-first tool for manufacturing floor supervisors to review work
order status, complete safety checklists, and manage shift handoff notes
directly from the production floor.

## Target User
A floor supervisor on their feet for most of a shift, using a phone or
ruggedized handheld between machines and lines.

## Problem Statement
Supervisors currently rely on paper checklists and verbal handoffs.
Status information is scattered, hard to reference mid-shift, and easy
to lose between shift changes.

## Core Capabilities
- Work order status board (in progress / blocked / complete)
- Per-shift, per-line safety checklist
- Shift handoff notes (outgoing supervisor → incoming supervisor)
- Quick-flag issue reporting (equipment, safety, staffing)

## Key User Flows
1. Start of shift: review handoff notes from the prior shift
2. Mid-shift: check and update work order statuses
3. Complete the safety checklist at designated checkpoints
4. End of shift: write handoff notes for the next supervisor

## Visual Direction
- Mobile-first, thumb-friendly, high-contrast for factory floor lighting
- Vuetify components sized for glove-friendly tap targets
- Minimal free text entry; favor toggles, chips, and checkboxes

## Success Criteria
- Safety checklist completable in under 2 minutes
- Handoff notes readable at a glance by the incoming supervisor
- Core actions (status update, checklist item, flag) reachable in ≤2 taps

## Out of Scope
- Inventory / MES system integration
- Shift scheduling
- Offline sync logic (assume connectivity for this mock)
