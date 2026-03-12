#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCRIPTS_DIR="$SCRIPT_DIR/scripts"

# Display usage
usage() {
  echo "Usage: ./run.sh <command> [args]"
  echo ""
  echo "Available commands:"
  echo "  build    - Build client and server"
  echo "  install  - Install dependencies"
  echo "  load     - Load data from API"
  echo "  setup    - Complete setup (install, load, build, start)"
  echo "  start    - Start production server"
  echo "  update   - Update dependencies and rebuild"
  exit 1
}

# Check if command is provided
if [ $# -lt 1 ]; then
  usage
fi

COMMAND="$1"
shift

case "$COMMAND" in
  build)
    bash "$SCRIPTS_DIR/build.sh" "$@"
    ;;
  install)
    bash "$SCRIPTS_DIR/install.sh" "$@"
    ;;
  load)
    bash "$SCRIPTS_DIR/load.sh" "$@"
    ;;
  setup)
    bash "$SCRIPTS_DIR/setup.sh" "$@"
    ;;
  start)
    bash "$SCRIPTS_DIR/start.sh" "$@"
    ;;
  update)
    bash "$SCRIPTS_DIR/update.sh" "$@"
    ;;
  *)
    echo "Unknown command: $COMMAND"
    echo ""
    usage
    ;;
esac
