#!/bin/bash
set -e
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT_DIR="$ROOT_DIR/scripts"
source "$SCRIPT_DIR/log.sh"

log::header "Loading data"

read -p "  Enter your LAND_REG_API_KEY: " API_KEY
echo ""

if [ -z "$API_KEY" ]; then
  log::error "API key is required"
  exit 1
fi

TEMP_DIR=$(mktemp -d)
DB_PATH="$ROOT_DIR/db/data.db"
ENV_FILE="$ROOT_DIR/etl/.env"

trap 'rm -rf "$TEMP_DIR"' EXIT

log::section "Configuration"
log::step "Writing API key to $ENV_FILE"
echo "LAND_REG_API_KEY=$API_KEY" > "$ENV_FILE"
log::ok "API key written"

log::section "Pipeline"
log::step "Running ETL pipeline..."
uv run --project "$ROOT_DIR/etl" python "$ROOT_DIR/etl/main.py" --output "$TEMP_DIR"
log::ok "Pipeline complete"

log::section "Database"
log::step "Loading schema..."
sqlite3 "$DB_PATH" < "$ROOT_DIR/db/schema.sql"
log::step "Importing titles..."
sqlite3 "$DB_PATH" ".import --csv --skip 1 $TEMP_DIR/titles.csv titles"
log::step "Importing companies..."
sqlite3 "$DB_PATH" ".import --csv --skip 1 $TEMP_DIR/companies.csv companies"
log::step "Importing join table..."
sqlite3 "$DB_PATH" ".import --csv --skip 1 $TEMP_DIR/titles_companies.csv titles_companies"
log::ok "Database loaded → $DB_PATH"

log::done
