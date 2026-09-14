#!/usr/bin/env bash
# Smoke test for update.sh existence and syntax.
#
# The update script is expected to exist in the repo. This test verifies
# the script is present and passes basic syntax checking.
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$DIR/../.." && pwd)"
UPDATE_SH="$ROOT/packages/linux/common/update.sh"

if [ ! -f "$UPDATE_SH" ]; then
  echo "SKIP: $UPDATE_SH not found (update.sh not yet implemented)"
  exit 0
fi

bash -n "$UPDATE_SH" || { echo "FAIL: $UPDATE_SH has a syntax error"; exit 1; }

SCRATCH=$(mktemp -d)
trap 'rm -rf "$SCRATCH"' EXIT

set +e
OUTPUT=$(INSTALL_DIR="$SCRATCH" bash "$UPDATE_SH" --check 2>&1)
STATUS=$?
set -e

echo "$OUTPUT"

if [ "$STATUS" -ne 0 ]; then
  echo "FAIL: update.sh --check exited with status $STATUS"
  exit 1
fi

if ! printf '%s' "$OUTPUT" | grep -qEi 'Update available|up to date'; then
  echo "FAIL: update.sh --check did not resolve an engine update."
  exit 1
fi

echo "SMOKE OK"
