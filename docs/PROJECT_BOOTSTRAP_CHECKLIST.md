# PROJECT BOOTSTRAP CHECKLIST

## リポジトリ作成直後
- [ ] GitHub リポジトリを private で作成
- [ ] main ブランチ保護を設定
- [ ] develop ブランチを作成
- [ ] README.md を配置
- [ ] pyproject.toml を配置
- [ ] .editorconfig を配置
- [ ] .gitignore を配置
- [ ] .pre-commit-config.yaml を配置
- [ ] .github/ISSUE_TEMPLATE を配置
- [ ] docs/SETUP.md を配置

## Python 開発基盤
- [ ] Python 3.11 を使用
- [ ] 仮想環境を作成
- [ ] requirements.in / requirements-dev.in を作成
- [ ] pip-compile で lock を生成
- [ ] Ruff / Black / isort / mypy / pytest を導入
- [ ] pre-commit を有効化

## Backend
- [ ] FastAPI エントリポイント作成
- [ ] settings 管理を pydantic-settings で実装
- [ ] logger 基盤を作成
- [ ] AppError 系例外を定義
- [ ] healthcheck API 作成

## Database
- [ ] PostgreSQL 接続設定
- [ ] SQLAlchemy ベース作成
- [ ] Alembic 初期化
- [ ] customers テーブル
- [ ] workers テーブル
- [ ] jobs テーブル
- [ ] job_assignments テーブル
- [ ] attendance テーブル

## Frontend
- [ ] Vite + React + TypeScript 初期化
- [ ] eslint / prettier を導入
- [ ] ルーティング設定
- [ ] レイアウト作成
- [ ] 案件一覧画面のモック作成

## 運用
- [ ] GitHub Actions で lint / test / typecheck を追加
- [ ] PR テンプレを作成
- [ ] Issue ラベルを定義
- [ ] milestone を作成
