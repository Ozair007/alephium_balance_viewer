#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

if [ -z "$1" ]; then
  read -p "Enter ALPH address: " address
else
  address="$1"
fi

if [ -z "$address" ]; then
  echo "Error: Address cannot be empty"
  exit 1
fi

cd "$PROJECT_ROOT"
npx tsx --tsconfig tsconfig.app.json src/lib/cli.ts "$address"
