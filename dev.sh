#!/usr/bin/env bash
# One-command dev startup: sets up both projects if needed, runs backend +
# frontend together, and opens the app in a browser. Ctrl+C stops both.
set -euo pipefail

cd "$(dirname "$0")"

BACKEND_PORT=8000
FRONTEND_PORT=5173

# Free up the ports in case a previous run is still hanging around.
lsof -ti:"$BACKEND_PORT" -sTCP:LISTEN 2>/dev/null | xargs -r kill 2>/dev/null || true
lsof -ti:"$FRONTEND_PORT" -sTCP:LISTEN 2>/dev/null | xargs -r kill 2>/dev/null || true

# --- Backend setup (idempotent) ---
if [ ! -d backend/.venv ]; then
  echo "Setting up backend virtualenv..."
  python3 -m venv backend/.venv
fi
backend/.venv/bin/pip install -q -r backend/requirements.txt

# --- Frontend setup (idempotent) ---
if [ ! -d frontend/node_modules ]; then
  echo "Installing frontend dependencies..."
  (cd frontend && npm install)
fi

# --- Start both servers ---
(cd backend && exec .venv/bin/uvicorn app.main:app --app-dir src --port "$BACKEND_PORT") &
BACKEND_PID=$!

(cd frontend && exec npm run dev -- --port "$FRONTEND_PORT" --open) &
FRONTEND_PID=$!

trap 'kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null' EXIT INT TERM

wait
