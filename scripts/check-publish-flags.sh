#!/usr/bin/env bash
# Guards against content/ files that lack `publish: true` frontmatter.
# content/ should normally only be touched via scripts/sync-vault.sh, but
# this catches manual edits (e.g. a PR that adds a file directly).
set -euo pipefail

CONTENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/content"

is_published() {
  awk '
    NR==1 {
      if ($0 == "---") { infm=1; next }
      else { exit 1 }
    }
    infm && $0 == "---" { exit (found ? 0 : 1) }
    infm && $0 ~ /^publish:[[:space:]]*true[[:space:]]*$/ { found=1 }
    END { exit (found ? 0 : 1) }
  ' "$1"
}

fail=0
while IFS= read -r -d '' file; do
  if ! is_published "$file"; then
    echo "::error file=${file}::missing \`publish: true\` frontmatter"
    fail=1
  fi
done < <(find "$CONTENT_DIR" -type f -name "*.md" -print0)

if [[ "$fail" -eq 1 ]]; then
  echo "One or more files under content/ are missing \`publish: true\`. See scripts/sync-vault.sh." >&2
  exit 1
fi

echo "All content/ files have publish: true."
