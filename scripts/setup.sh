#!/bin/bash
set -e
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT_DIR="$ROOT_DIR/scripts"
source "$SCRIPT_DIR/log.sh"

log::header "Setting up company-property-search"

log::section "Dependencies"
bash "$SCRIPT_DIR/install.sh"

log::section "Data"
bash "$SCRIPT_DIR/load.sh"

log::section "Build"
bash "$SCRIPT_DIR/build.sh"

log::section "Server"
bash "$SCRIPT_DIR/start.sh"
