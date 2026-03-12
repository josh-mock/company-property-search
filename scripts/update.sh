#!/bin/bash
set -e
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT_DIR="$ROOT_DIR/scripts"
source "$SCRIPT_DIR/log.sh"

log::header "Updating company-property-search"

log::section "Source"
log::step "Pulling latest changes..."
git pull
log::ok "Up to date"

log::section "Dependencies"
bash "$SCRIPT_DIR/install.sh"

log::section "Build"
bash "$SCRIPT_DIR/build.sh"

log::done
