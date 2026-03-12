#!/bin/bash
set -e
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT_DIR="$ROOT_DIR/scripts"
source "$SCRIPT_DIR/log.sh"

PORT=${1:-3000}
PRODUCTION=${2:-true}
DB=${3:-../db/data.db}

log::header "Building company-property-search"

log::section "Frontend"
log::step "Building client..."
cd "$ROOT_DIR/client" && npm run build
log::ok "Client built"

log::section "Backend"
log::step "Building server..."
cd "$ROOT_DIR/server" && npm run build
log::ok "Server built"

log::section "Environment"
log::step "Writing .env..."
cat > "$ROOT_DIR/server/.env" <<EOF
PORT=$PORT
PRODUCTION=$PRODUCTION
DB=$DB
EOF
log::ok ".env written"
