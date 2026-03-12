#!/bin/bash
set -e
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT_DIR="$ROOT_DIR/scripts"
source "$SCRIPT_DIR/log.sh"

log::header "Starting server"

log::step "Launching production server..."
cd "$ROOT_DIR/server"
node dist/index.js
