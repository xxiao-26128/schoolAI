# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This is a monorepo split into two independent projects:

- [frontend/](frontend/) — React 19 + TypeScript + Vite dashboard.
- [backend/](backend/) — Python + FastAPI service.

There is no root-level build tool tying them together; run commands from within each subfolder.

## Commands

### Frontend (`frontend/`)

- `npm run dev` — start the Vite dev server with HMR.
- `npm run build` — type-check via `tsc -b` (using the project references in [tsconfig.json](frontend/tsconfig.json)) then produce a production build with `vite build`.
- `npm run lint` — run Oxlint using the ruleset in [.oxlintrc.json](frontend/.oxlintrc.json).
- `npm run preview` — serve the built `dist/` output locally.

No frontend test suite is configured yet (no test runner, no test files).

### Backend (`backend/`)

- `.venv/bin/uvicorn app.main:app --app-dir src --reload` — start the dev server (`GET /api/v1/classrooms` and `GET /api/v1/students` are the endpoints so far). `--app-dir src` is required because the app lives under `src/` (see Architecture below).
- `.venv/bin/python -m pytest -v` — run the test suite. Import resolution (`from app.main import app`) works via `pythonpath = ["src"]` in [pyproject.toml](backend/pyproject.toml), no editable install needed.
- Dependencies are pinned in [requirements.txt](backend/requirements.txt); the venv at `backend/.venv` is gitignored and must be created locally (`python3 -m venv .venv && .venv/bin/pip install -r requirements.txt`).

## Architecture

### Frontend

A single-page dashboard called "schoolai" ("Student Growth Insight"). Styling is Tailwind CSS v4, wired in via the `@tailwindcss/vite` plugin ([vite.config.ts](frontend/vite.config.ts)) rather than a `tailwind.config.js` — utility classes are used directly in JSX with no separate design-token layer.

The app has no router and no state-management library. All data is currently static mock data imported from [mockData.ts](frontend/src/data/mockData.ts) and typed in [types.ts](frontend/src/types.ts); runtime state (selected classroom, selected student, selected time range, custom date range) is held in [App.tsx](frontend/src/App.tsx) via `useState` and passed down as props. `mockData.ts` is the seam to replace once the frontend is wired to the backend — see `GET /api/roster` below, which already mirrors its classroom/student shape.

[App.tsx](frontend/src/App.tsx) lays out the page as two side-by-side regions:
- A scrollable main content column: [TopBar](frontend/src/components/layout/TopBar.tsx) → page heading → [FilterBar](frontend/src/components/filters/FilterBar.tsx) → a stack of insight cards.
- A fixed-width chat sidebar, [ChatPanel](frontend/src/components/chat/ChatPanel.tsx).

Components are grouped by feature area under `src/components/`:
- `layout/` — [TopBar.tsx](frontend/src/components/layout/TopBar.tsx): the top navigation bar (breadcrumb + icon actions).
- `filters/` — [FilterBar.tsx](frontend/src/components/filters/FilterBar.tsx): two dependent dropdowns (classroom, then student scoped to that classroom — the student dropdown is disabled when "Everyone" is selected and resets whenever the classroom changes) plus the time-range toggle. [CustomDateRangePicker.tsx](frontend/src/components/filters/CustomDateRangePicker.tsx) is a from-scratch calendar popover (no date-picker library) opened by the "Custom" time-range option.
- `insights/` — the main-column summary cards: [DiscussionSummaryCard.tsx](frontend/src/components/insights/DiscussionSummaryCard.tsx) renders a grid of [InsightSubCard.tsx](frontend/src/components/insights/InsightSubCard.tsx) entries (theme/question/interest/engagement, each mapped to an icon via `iconByType`); [AssessmentSummaryCard.tsx](frontend/src/components/insights/AssessmentSummaryCard.tsx) is currently a placeholder ("coming soon").
- `chat/` — the "Claire AI" sidebar: [ChatPanel.tsx](frontend/src/components/chat/ChatPanel.tsx) composes [ChatMessage.tsx](frontend/src/components/chat/ChatMessage.tsx) (renders assistant vs. student bubbles differently based on `role`), [PromptSuggestions.tsx](frontend/src/components/chat/PromptSuggestions.tsx), and [ChatInputBar.tsx](frontend/src/components/chat/ChatInputBar.tsx) (the input row; not yet wired to any submit handler or to the current filter selection).
- [icons.tsx](frontend/src/components/icons.tsx) — all SVG icons share a common `base()` prop factory (16x16, `currentColor` stroke) and are exported as individual named components consumed throughout the tree above.

Shared domain types (`ClassroomOption`, `StudentOption`, `TimeRange`, `DateRange`, `InsightSection`, `ChatMessage`, `PromptSuggestion`) live in [types.ts](frontend/src/types.ts) and are the contract between `mockData.ts` and the components. Students are scoped by `classroomId`, which is what lets two same-named students in different classrooms resolve unambiguously without any special-casing.

### Backend

A FastAPI service exposing classroom/student roster endpoints, laid out as a layered `src/app/` package (`api/` → `services/` → `repositories/`, plus `schemas/` for request/response DTOs). There is no `/api/roster` anymore — it was replaced by the split below since nothing consumed it and versioned, resource-oriented endpoints are the intended long-term shape.

- [schemas/classroom.py](backend/src/app/schemas/classroom.py) / [schemas/student.py](backend/src/app/schemas/student.py) — Pydantic DTOs with camelCase JSON aliases (e.g. `classroom_id` serializes as `classroomId`) so the wire format matches the frontend's TypeScript types exactly.
- [repositories/classroom_repository.py](backend/src/app/repositories/classroom_repository.py) / [repositories/student_repository.py](backend/src/app/repositories/student_repository.py) — `ClassroomRepository` / `StudentRepository`, currently backed by in-memory mock data mirroring `frontend/src/data/mockData.ts` (the "Everyone" audience option is intentionally frontend-only and not a real classroom here). Swap the method bodies for real queries once `db/` has actual persistence, without touching callers.
- [services/classroom_service.py](backend/src/app/services/classroom_service.py) / [services/student_service.py](backend/src/app/services/student_service.py) — `ClassroomService` (thin passthrough) and `StudentService` (classroom scoping, name search, cursor-based pagination — sorted by `(name, id)`, id as a tiebreaker so same-named students in different classrooms still get a stable order).
- [api/classrooms.py](backend/src/app/api/classrooms.py) — `GET /api/v1/classrooms`, returns every classroom (unfiltered; will be teacher-scoped once JWT auth exists).
- [api/students.py](backend/src/app/api/students.py) — `GET /api/v1/students?classroom_id=&search=&cursor=&limit=`. `classroom_id` narrows to one classroom (404 if it doesn't exist), `search` is a case-insensitive substring match on name, `cursor`/`limit` are opaque cursor-based pagination (base64-encoded `(name, id)` position; 400 on an invalid cursor).
- [main.py](backend/src/app/main.py) — creates the `FastAPI` app and includes the routers from `api/`.
- `models/`, `core/`, and `db/` exist as empty scaffold packages (no ORM models, config/security, or DB setup exist yet) — filled in as those concerns get built. In particular, there is no auth yet: `classroom_id` existence is validated, but not ownership — a teacher_id extracted from a JWT (via a `core/security.py` dependency, not yet written) is meant to scope both endpoints to only the classrooms/students that teacher has access to.

Planned but not yet built: insights endpoints (discussion/assessment summaries, filtered by classroom/student/time-range) and chat endpoints, with a "Chat Agent Service" as a separate layer responsible for LLM orchestration (calling Claude, and likely tool-use against the insights data) rather than the FastAPI route handlers calling the LLM directly.
