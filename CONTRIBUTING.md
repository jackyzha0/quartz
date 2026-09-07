# 開発フロー

`v5` への直接pushは禁止。すべての変更はブランチ + PR経由で行う。

## ブランチ命名

| プレフィックス | 用途 |
|---|---|
| `content/<slug>` | 記事の追加・更新 |
| `feat/<slug>` | サイト機能・設定の追加 |
| `fix/<slug>` | 不具合修正 |
| `chore/<slug>` | 依存更新・雑務 |

## 手順

```bash
git checkout -b content/<slug>
# Vault側でfrontmatterに publish: true を付与してから
bash scripts/sync-vault.sh
git add -A && git commit -m "..."
git push -u origin content/<slug>
gh pr create --base v5 --fill
```

CI（`PR Check`）がグリーンになったらマージする。

```bash
gh pr merge --squash --delete-branch
```

`v5`へのマージで `.github/workflows/gh-pages.yaml` が自動的にGitHub Pagesへデプロイする。

## CIが検証する内容

- `npx quartz build` が通ること
- `content/` 配下の全 `.md` に `publish: true` frontmatterがあること（`scripts/check-publish-flags.sh`）— `sync-vault.sh` を経由しない手動編集で非公開ノートやフラグ漏れの記事が混入するのを防ぐガード

詳細な背景・運用ハーネスの全体像は Obsidian Vault側の `quartz-collab-harness.md` を参照。
