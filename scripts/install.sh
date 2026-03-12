#!/bin/bash
set -e
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT_DIR="$ROOT_DIR/scripts"
source "$SCRIPT_DIR/log.sh"

log::header "Installing dependencies"

log::section "Server packages"
cd "$ROOT_DIR/server" && npm install
log::ok "Server packages installed"

log::section "Client packages"
cd "$ROOT_DIR/client" && npm install
log::ok "Client packages installed"

log::section "ETL packages"
cd "$ROOT_DIR/etl" && uv sync
log::ok "ETL packages installed"

log::done
