#!/usr/bin/env bash

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

for name in backend frontend; do
    file=".$name.pid"

    if [[ -f "$file" ]]; then
        pid=$(cat "$file")
        kill -- "-$pid" 2>/dev/null || true
        rm -f "$file"
    fi
done

echo "Backend and frontend stopped"
