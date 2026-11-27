# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**GitHubプロフィールREADMEリポジトリ** (`TakumiOkayasu/TakumiOkayasu`)。
GitHubプロフィールページに表示される`README.md`を管理する。

主な構成要素:
- 開発者紹介・技術スタック表示
- GitHubスタット（バッジ・statsサービス）
- コントリビューションsnakeアニメーション

## Tech Stack

| 種別 | 内容 |
| --- | --- |
| 主要ファイル | `README.md` (Markdown) |
| CI/CD | GitHub Actions |
| 自動生成 | Snake SVG (`Platane/snk/svg-only@v3`) |
| 依存管理 | Dependabot (GitHub Actions weekly更新) |
| 外部サービス | shields.io, GitHub Stats API 等 |

## GitHub Actions Workflows

### snake.yml
コントリビューションsnakeアニメーションSVGを生成する。

| 項目 | 内容 |
| --- | --- |
| トリガー | 毎日UTC 0:00 / mainへのpush / 手動dispatch |
| 出力先 | `output`ブランチ |
| 使用Action | `Platane/snk/svg-only@v3` |

### link-check.yml
`README.md`内の外部画像・バッジURLを検証する。

| 項目 | 内容 |
| --- | --- |
| トリガー | 毎週月曜 / README.md変更時 / 手動dispatch |
| 検出時 | GitHub Issueを自動作成 |
| 結果 | アーティファクトとしてアップロード |

## Dependabot

GitHub Actionsの依存関係を週次で自動更新。コミットプレフィックス: `ci:`

## 禁止事項

| 操作 | 理由 |
| --- | --- |
| `output`ブランチの手動編集 | snake SVGはCI自動生成。手動編集は次回CI実行時に上書きされる |
| 外部バッジURLの無断変更 | サービス仕様に依存。変更時はlink-checkで動作確認必須 |
| `README.md`の画像URLをローカルパスに変更 | GitHubプロフィール表示が壊れる |

## Development Notes

- **外部サービス障害**: GitHub Stats・shields.io等はレート制限・一時障害あり。表示崩れはリポジトリ側の問題ではない可能性が高い
- **link-check失敗時**: 自動でGitHub Issueが作成される。Issueを確認して対応する
- **snake SVG確認**: `output`ブランチの最新コミットで生成結果を確認する

## 作業前チェックリスト

- [ ] `output`ブランチを直接編集していないか
- [ ] 外部バッジURL変更時はlink-checkのワークフローを手動実行して確認したか
- [ ] GitHub Actions変更時はDependabot設定(`dependabot.yml`)と整合性があるか
