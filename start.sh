#!/usr/bin/env bash

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

setsid bash -c 'cd "$1/backend" && exec npm run dev' _ "$ROOT_DIR" >/tmp/project-backend.log 2>&1 &
echo $! > .backend.pid

setsid bash -c 'cd "$1/frontend" && exec npm run dev' _ "$ROOT_DIR" >/tmp/project-frontend.log 2>&1 &
echo $! > .frontend.pid

echo "Backend and frontend started"
