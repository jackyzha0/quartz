# 運用メモ（このリポジトリ固有）

Obsidian Vault (`~/Documents/Obsidian Vault`) → Quartz → GitHub Pages (`https://uruha.github.io/notes/`) の公開設定。

## 記事を公開するとき

1. Obsidianでいつも通りノートを編集する
2. 公開したいノートのfrontmatterに `publish: true` を追加する
   ```yaml
   ---
   title: ...
   publish: true
   ---
   ```
3. このリポジトリで同期スクリプトを実行する
   ```bash
   bash scripts/sync-vault.sh
   ```
4. ローカルで確認したい場合
   ```bash
   npx quartz build --serve
   ```
5. コミット・push
   ```bash
   git add -A
   git commit -m "Add: <記事タイトル>"
   git push origin v5
   ```
6. 数分後、GitHub Actions (`Deploy to GitHub Pages`) が自動ビルドして反映される。進捗は `gh run list -R uruha/notes` で確認可能。

## 仕組み・注意点

- `content/` はVaultからの導出物であり、**直接編集しない**（`sync-vault.sh` 実行のたびに `content/index.md` 以外は全消去・再生成される）。
- Vaultの実パスは `.vault-path.local`（gitignore対象）に保存されている。他マシンでcloneした場合はこのファイルを作り直すこと。
- `explicit-publish` プラグインを有効化しているため、`publish: true` の無いノートはVaultを丸ごとsymlinkしても公開されない設計になっている（ビルド時フィルタ）。加えて `sync-vault.sh` 自体も `publish: true` のノートしか `content/` にコピーしないため、非公開ノートの生データが公開リポジトリの履歴に入ることもない（二重の安全策）。
- デフォルトブランチは `main` ではなく **`v5`**。GitHub Pages用ワークフロー `.github/workflows/gh-pages.yaml` は独自追加したもの（本家のワークフローは `jackyzha0/quartz` 限定 + Cloudflare Pages向けのため使えない）。
- Vault内の `Notes/` フォルダとGitHub Pagesの公開パス `/notes/` が名前が同じため、記事URLが `https://uruha.github.io/notes/notes/<slug>` のように `notes` が重複する（動作上は問題ないが見た目が少し冗長）。気になる場合はVault側のフォルダ名を変えるか、`sync-vault.sh` でリネームコピーする一手間を加える。
