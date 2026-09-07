# 協業ハーネス

`uruha/notes`（GitHub Pages: https://uruha.github.io/notes/）に対する変更は、すべてブランチ + PR経由で行う。`v5`（デフォルトブランチ）への直接pushは禁止（branch protectionで強制済み、オーナー含む）。

このリポジトリ単独で読める運用ドキュメント。Vault→Quartzの初回セットアップ手順自体（他のサイトにも使い回す汎用手順）は、このリポジトリの外（Obsidian Vault管理者の個人アセット `quartz-publish-harness.md`）にある。

---

## 1. ブランチ命名

| プレフィックス | 用途 | 例 |
|---|---|---|
| `content/<slug>` | 記事の追加・更新 | `content/semantic-decision-support` |
| `feat/<slug>` | サイト機能・設定の追加 | `feat/add-rss` |
| `fix/<slug>` | 不具合修正 | `fix/duplicate-notes-path` |
| `chore/<slug>` | 依存更新・雑務 | `chore/npm-audit-fix` |

## 2. PRフロー

```bash
git checkout -b content/<slug>
# Vault側で対象ノートのfrontmatterに publish: true を付与してから
bash scripts/sync-vault.sh
git add -A && git commit -m "..."
git push -u origin content/<slug>
gh pr create --base v5 --fill
```

CI（`PR Check`）がグリーンになったらマージ:

```bash
gh pr merge --squash --delete-branch
```

`v5`へのマージで `.github/workflows/gh-pages.yaml` が自動的にGitHub Pagesへデプロイする。

## 3. CI: `.github/workflows/pr-check.yaml`

`pull_request`（対象: `v5`）トリガーで、デプロイはせず検証のみ行う:
- `npx quartz build` が通ること
- `scripts/check-publish-flags.sh`: `content/`配下の全`.md`（`index.md`含む）に`publish: true`があるか検査。`sync-vault.sh`を経由しない手動編集で非公開ノートやフラグ漏れの記事が混入するのを機械的にブロックする。

## 4. Branch protection（`v5`に設定済み）

```bash
gh api -X PUT repos/uruha/notes/branches/v5/protection --input branch-protection.json
```
```json
{
  "required_status_checks": { "strict": true, "contexts": ["build"] },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 0,
    "dismiss_stale_reviews": false,
    "require_code_owner_reviews": false
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
```

- `required_pull_request_reviews`を（承認0件でも）**存在させることが「PR必須」を有効にする鍵**。`null`のままだと直接pushがブロックされない（実装時に判明した罠）。
- レビュアー必須にはしていない（一人運用のため`required_approving_review_count: 0`）が、PR経由であること・CI（`build`）が通ることは必須。
- `enforce_admins: true` によりリポジトリオーナー自身も直接push不可（動作確認済み: `git push origin v5` は `GH006: Protected branch update failed` で拒否される）。

## 5. 既知の注意点

- `pr-check.yaml`の`build`ジョブと、`gh-pages.yaml`の`build`ジョブは名前が同じ（"build"）。ただし前者は`pull_request`、後者は`push`トリガーなのでPRチェックの文脈では衝突しない。
- リポジトリのデフォルトブランチは`main`ではなく`v5`（fork元の慣習に合わせている）。
- Vault内の`Notes/`フォルダとGitHub Pagesの公開パス`/notes/`の名前が一致しているため、記事URLが`/notes/notes/<slug>`のように重複する（動作は正常）。
