---
paths:
  - "backend/**/*.py"
  - "backend/pyproject.toml"
  - "backend/requirements.txt"
---

# Backend rules

## Boundaries and placement

- Keep Python application code under `backend/src/app/` and backend tests under `backend/tests/`.
- Put FastAPI route modules in `backend/src/app/api/`.
- Put Pydantic request and response schemas in `backend/src/app/schemas/`.
- Put business rules and use-case orchestration in `backend/src/app/services/`.
- Put persistence and data access in `backend/src/app/repositories/`.
- Put database entities in `backend/src/app/models/`, configuration and security in `backend/src/app/core/`, and database setup in `backend/src/app/db/`.
- Do not add Python application modules to the repository root or to `frontend/`.

## Layering

- Preserve the dependency flow: `api -> services -> repositories`.
- Route handlers validate HTTP inputs, translate expected domain errors into HTTP responses, and call services. They must not query storage or contain substantial business logic.
- Services must not depend on FastAPI request or response objects.
- Repositories own database queries or the current in-memory data source. Do not expose database-specific details to routes.
- Use FastAPI dependency injection for services, repositories, database sessions, authentication, and other request-scoped dependencies.

## API contract

- Use Pydantic models for public request and response bodies; do not return ORM or internal persistence objects directly.
- Python identifiers use snake_case. Preserve the established camelCase JSON aliases required by the frontend, including `classroomId`, `nextCursor`, and `hasMore`.
- Use query parameters for optional filters, search, cursors, and limits. Do not add request bodies to GET endpoints.
- Use a classroom identifier in the path only when the endpoint represents students nested under one required classroom; use a query parameter when classroom is an optional student filter.
- Validate pagination limits on the server and keep a safe maximum. Never support an unbounded `limit=all` list endpoint.
- Preserve stable cursor ordering with a unique tiebreaker. For students, `(name, id)` is the established ordering.
- Keep sentinel UI choices such as "Everyone" and "All Students" out of repositories and API responses.
- Translate invalid cursors and missing classrooms into explicit client errors rather than leaking internal exceptions.

## Data access and performance

- Apply classroom filters, search, ordering, and pagination in the repository/database once persistent storage is introduced; do not load the full table and filter it in Python.
- Avoid N+1 queries when returning classrooms with related students.
- Keep API response fields minimal and intentional; do not expose internal or sensitive fields.

## Verification

- Add or update backend tests whenever endpoint behavior, validation, schemas, services, or repositories change.
- Run `.venv/bin/python -m pytest -v` from `backend/` after backend changes.
- Keep dependencies pinned in `backend/requirements.txt`; update them only when the task requires it.
