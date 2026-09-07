#!/usr/bin/env bash
# Syncs notes tagged `publish: true` from the Obsidian vault into content/.
# content/ is fully derived from the vault — do not edit files there directly.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VAULT_PATH_FILE="$REPO_ROOT/.vault-path.local"
CONTENT_DIR="$REPO_ROOT/content"

if [[ ! -f "$VAULT_PATH_FILE" ]]; then
  echo "Error: $VAULT_PATH_FILE not found. Create it with the path to your Obsidian vault (single line, no trailing newline needed)." >&2
  exit 1
fi

VAULT_PATH="$(cat "$VAULT_PATH_FILE")"
if [[ ! -d "$VAULT_PATH" ]]; then
  echo "Error: vault path '$VAULT_PATH' does not exist." >&2
  exit 1
fi

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

find "$CONTENT_DIR" -mindepth 1 ! -name "index.md" -delete

count=0
while IFS= read -r -d '' file; do
  if is_published "$file"; then
    rel_path="${file#"$VAULT_PATH"/}"
    dest="$CONTENT_DIR/$rel_path"
    mkdir -p "$(dirname "$dest")"
    cp "$file" "$dest"
    count=$((count + 1))
    echo "synced: $rel_path"
  fi
done < <(find "$VAULT_PATH" -type f -name "*.md" -not -path "*/.obsidian/*" -print0)

echo "Done. $count note(s) synced."
