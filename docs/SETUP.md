# SETUP

## 1. 前提ソフト
- Git
- Python 3.11
- Node.js 20 以上
- VSCode
- Docker Desktop（推奨）
- PostgreSQL 15 以上（ローカル利用時）

## 2. VSCode 推奨拡張
- Python
- Pylance
- Ruff
- Black Formatter
- isort
- GitLens
- EditorConfig for VS Code
- ESLint
- Prettier

## 3. Python 仮想環境
```bash
python -m venv .venv
source .venv/bin/activate
# Windows PowerShell
# .venv\Scripts\Activate.ps1
```

## 4. 依存導入
```bash
python -m pip install --upgrade pip
pip install -r requirements-dev.txt
pre-commit install
```

## 5. バックエンド起動
```bash
uvicorn yaguchi_production_system.api.main:app --reload
```

## 6. フロントエンド起動
```bash
cd frontend
npm install
# cp .env.example .env
npm run dev
```

## 7. テスト
```bash
pytest
```

## 8. Lint / Format / Type Check
```bash
ruff check .
black .
isort .
mypy src
```

## 9. Alembic 初期化
```bash
alembic init migrations
alembic revision --autogenerate -m "init"
alembic upgrade head
```

## 10. Codex 利用ルール
- 1 Issue = 1 依頼単位で依頼する
- まず仕様、次に変更対象、最後に完了条件を書く
- 一度に広げすぎず、小さい差分で進める
- 生成コードは必ずレビューする
