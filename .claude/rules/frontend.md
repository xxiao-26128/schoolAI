---
paths:
  - "frontend/**/*.{ts,tsx,css,json,html}"
---

# Frontend rules

## Boundaries and placement

- Keep all React and TypeScript application code under `frontend/src/`.
- Put reusable UI in `frontend/src/components/`; group feature components in descriptive subfolders such as `filters/`, `insights/`, `chat/`, and `layout/`.
- Put backend API request functions in `frontend/src/api/`. Components must not contain raw `fetch` calls.
- Put reusable data-fetching and stateful behavior in `frontend/src/hooks/` when it is shared by more than one component.
- Put shared domain and API types in `frontend/src/types/`. If this grows beyond one file, split it by domain and re-export from `frontend/src/types/index.ts`.
- Keep temporary fixture data in `frontend/src/data/`; do not mix mock records with production API clients.
- Do not edit generated or dependency folders such as `frontend/node_modules/` and `frontend/dist/`.
- Do not add frontend source files to the repository root or to `backend/`.

## React and TypeScript

- Use React function components, hooks, and explicit TypeScript types.
- Avoid `any`; use `unknown` and narrow it when external data is not yet typed.
- Keep presentational components focused on rendering. Move API orchestration and non-trivial state transitions to the page, a feature component, or a custom hook.
- Keep components small and compose them instead of expanding `App.tsx` into a feature implementation.
- Preserve the existing React 19, Vite, Tailwind CSS v4, and Oxlint toolchain unless the task explicitly requires changing it.
- Use the existing Tailwind utility approach in JSX; do not introduce a separate styling system without explicit approval.

## API integration

- Treat TypeScript API response types as the frontend side of the backend contract.
- The current wire format uses camelCase, including `classroomId`, `nextCursor`, and `hasMore`.
- Keep "Everyone" and "All Students" as frontend-only selections. Represent "All Students" with an empty string or `null`, not a fake backend student record.
- When the selected classroom changes, clear the selected student before loading the new classroom roster.
- For paginated student options, request a bounded `limit`, send the classroom filter as the `classroom_id` query parameter, and use the returned cursor rather than calculating pages in the browser.
- API-driven UI must include loading, empty, and recoverable error states.

## Verification

- After frontend changes, run `npm run lint` and `npm run build` from `frontend/`.
- No frontend test runner is configured. Do not claim frontend tests passed unless a test suite has been added and run.
