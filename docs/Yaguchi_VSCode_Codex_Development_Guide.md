# ヤグチ電子 生産管理システムアプリ
## VSCode + Codex 開発ガイド

### 目的
- VSCode と Codex を使って、案件管理・工員管理・売上管理アプリを効率よく開発する
- GitHub Issue 駆動で実装単位を明確化する
- ヤグチ電子 Python コーディング規格に沿って品質を揃える

### 前提技術
- Backend: Python 3.11 / FastAPI / Pydantic v2 / SQLAlchemy
- Frontend: React + TypeScript + PWA
- DB: PostgreSQL
- Quality: Black / isort / Ruff / mypy / pytest / pre-commit
- Repo: GitHub

### 推奨フォルダ構成
```text
repo/
  backend/
    src/production_system/
      api/
      core/
      models/
      services/
      adapters/
      schemas/
    tests/
    alembic/
  frontend/
    src/
      pages/
      components/
      hooks/
      api/
      types/
  docs/
  .github/
```

### VSCode 推奨拡張
- Python
- Pylance
- Ruff
- Black Formatter
- GitHub Pull Requests and Issues
- ESLint
- Prettier

### settings.json 例
```json
{
  "editor.formatOnSave": true,
  "files.eol": "
",
  "python.testing.pytestEnabled": true,
  "python.analysis.typeCheckingMode": "basic",
  "ruff.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.organizeImports": "explicit"
  }
}
```

### GitHub Issue 駆動の基本
- 1 Issue = 1 実装単位
- feature/<topic> でブランチ作成
- PR は Conventional Commits を意識
- Codex には Issue 内容をそのまま渡せる粒度で依頼する

### Codex 依頼テンプレート
```text
依頼内容:
Issue #xx を実装してください。

背景:
この機能が必要な理由。

対象:
変更対象ディレクトリ / ファイル。

制約:
- Python 3.11
- FastAPI + Pydantic v2
- ヤグチ電子 Pythonコーディング規格準拠
- 型注釈必須
- pytest追加

完了条件:
- API / UI / test の具体条件
- Ruff / mypy / pytest 通過
```

### 最初の着手順
1. FastAPI 初期化
2. SQLAlchemy / Alembic 設定
3. Customer CRUD
4. Job CRUD
5. pytest 整備
6. React 一覧画面

### 重要方針
- Excel再現ではなく DB中心設計
- AI機能はPhase1に混ぜない
- 生成コードは必ずレビューする
