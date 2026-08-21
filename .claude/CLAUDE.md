# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR.
- `npm run build` — type-check via `tsc -b` (using the project references in [tsconfig.json](tsconfig.json)) then produce a production build with `vite build`.
- `npm run lint` — run Oxlint using the ruleset in [.oxlintrc.json](.oxlintrc.json).
- `npm run preview` — serve the built `dist/` output locally.

There is no test suite configured in this project (no test runner, no test files).

## Architecture

This is a single-page React 19 + TypeScript + Vite dashboard called "schoolai" ("Student Growth Insight"). Styling is Tailwind CSS v4, wired in via the `@tailwindcss/vite` plugin ([vite.config.ts](vite.config.ts)) rather than a `tailwind.config.js` — utility classes are used directly in JSX with no separate design-token layer.

The app has no router, no backend/API calls, and no state-management library. All data is static mock data imported from [src/data/mockData.ts](src/data/mockData.ts) and typed in [src/types.ts](src/types.ts); the only runtime state is the two `useState` filter selections held in [src/App.tsx](src/App.tsx) (selected audience and selected time range) and passed down as props. To wire the UI to real data, `mockData.ts` is the seam to replace.

[src/App.tsx](src/App.tsx) lays out the page as two side-by-side regions:
- A scrollable main content column: [TopBar](src/components/layout/TopBar.tsx) → page heading → [FilterBar](src/components/filters/FilterBar.tsx) (audience `<select>` + time-range toggle) → a stack of insight cards.
- A fixed-width chat sidebar, [ChatPanel](src/components/chat/ChatPanel.tsx), rendered alongside the main column.

Components are grouped by feature area under `src/components/`:
- `layout/` — [TopBar.tsx](src/components/layout/TopBar.tsx): the top navigation bar (breadcrumb + icon actions).
- `filters/` — [FilterBar.tsx](src/components/filters/FilterBar.tsx): audience and time-range filter controls; selection state is owned by `App` and passed in as controlled props.
- `insights/` — the main-column summary cards: [DiscussionSummaryCard.tsx](src/components/insights/DiscussionSummaryCard.tsx) renders a grid of [InsightSubCard.tsx](src/components/insights/InsightSubCard.tsx) entries (theme/question/interest/engagement, each mapped to an icon via `iconByType`); [AssessmentSummaryCard.tsx](src/components/insights/AssessmentSummaryCard.tsx) is currently a placeholder ("coming soon").
- `chat/` — the "Claire AI" sidebar: [ChatPanel.tsx](src/components/chat/ChatPanel.tsx) composes [ChatMessage.tsx](src/components/chat/ChatMessage.tsx) (renders assistant vs. student bubbles differently based on `role`), [PromptSuggestions.tsx](src/components/chat/PromptSuggestions.tsx), and [ChatInputBar.tsx](src/components/chat/ChatInputBar.tsx) (the input row; not yet wired to any submit handler).
- [icons.tsx](src/components/icons.tsx) — all SVG icons share a common `base()` prop factory (16x16, `currentColor` stroke) and are exported as individual named components consumed throughout the tree above.

Shared domain types (`AudienceOption`, `TimeRange`, `InsightSection`, `ChatMessage`, `PromptSuggestion`) live in [src/types.ts](src/types.ts) and are the contract between `mockData.ts` and the components.
