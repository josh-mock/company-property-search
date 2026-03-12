#!/bin/bash
# log.sh — shared terminal output helpers
# Usage: source "$(dirname "$0")/log.sh"

# ── Colours & styles ────────────────────────────────────────────────────────
_RESET="\033[0m"
_BOLD="\033[1m"
_DIM="\033[2m"

_WHITE="\033[97m"
_GREEN="\033[32m"
_YELLOW="\033[33m"
_RED="\033[31m"
_CYAN="\033[36m"
_GREY="\033[90m"

# ── Core helpers ─────────────────────────────────────────────────────────────

# log::header "Title"  — bold banner with a top rule
log::header() {
  local title="$1"
  local width=44
  local rule
  rule=$(printf '─%.0s' $(seq 1 $width))
  echo -e "\n${_BOLD}${_WHITE}  ${rule}${_RESET}"
  echo -e "${_BOLD}${_WHITE}  ${title}${_RESET}"
  echo -e "${_BOLD}${_WHITE}  ${rule}${_RESET}\n"
}

# log::section "Label"  — dimmed section divider
log::section() {
  echo -e "\n${_BOLD}${_CYAN}▸ $1${_RESET}"
}

# log::step "message"  — in-progress action
log::step() {
  echo -e "  ${_DIM}${_WHITE}→ $1${_RESET}"
}

# log::ok "message"  — success confirmation
log::ok() {
  echo -e "  ${_GREEN}✓${_RESET} $1"
}

# log::warn "message"  — non-fatal warning
log::warn() {
  echo -e "  ${_YELLOW}⚠${_RESET}  $1" >&2
}

# log::error "message"  — fatal error (does NOT exit — caller decides)
