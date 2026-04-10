# Yaguchi Production System

ヤグチ電子 生産管理システムの開発用リポジトリです。

本プロジェクトは、前任者の Excel 管理から脱却し、案件・工員・進捗・売上・利益を一元管理できる Web アプリの構築を目的とします。開発は **VSCode + Codex + Python + FastAPI** を前提とし、フロントエンドは React を採用します。

## 目的
- 案件管理の属人化解消
- 納期遅延、出荷待ち、進捗停滞の見える化
- 工員負荷の見える化
- 売上・粗利の即時把握
- 初心者でも運用できる管理システムの実現
- 将来的な実装最適化支援機能との連携基盤整備

## 技術スタック
- Backend: Python 3.11 / FastAPI / SQLAlchemy / Alembic / Pydantic v2
- Frontend: React + Vite + TypeScript + PWA
- Database: PostgreSQL
- Tooling: Ruff / Black / isort / mypy / pytest / pre-commit
- Editor: VSCode
- AI 支援: Codex

## ディレクトリ構成
```text
repo/
  src/
    yaguchi_production_system/
      api/
      core/
      models/
      services/
      adapters/
  tests/
  docs/
  scripts/
  frontend/
  .github/
  .vscode/
```

## 開発ルール
- Python コーディングは社内規格に準拠する
- public API は型注釈必須
- 例外は握りつぶさず分類する
- pre-commit を必ず有効化する
- Codex に依頼する際は docs/CODEX_PROMPT_TEMPLATES.md を使う

## 最初の着手順
1. 開発環境セットアップ
2. pre-commit 導入
3. DB 設計確定
4. Alembic 初期マイグレーション
5. 顧客 / 工員 / 案件モデル作成
6. 案件 CRUD API 実装
7. 案件一覧画面実装

## 参考資料
- docs/SETUP.md
- docs/PROJECT_BOOTSTRAP_CHECKLIST.md
- docs/CODEX_PROMPT_TEMPLATES.md
- .github/ISSUE_TEMPLATE/
