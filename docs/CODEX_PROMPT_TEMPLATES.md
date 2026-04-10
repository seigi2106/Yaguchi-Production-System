# CODEX PROMPT TEMPLATES

## 1. FastAPI の機能追加
```text
あなたはヤグチ電子生産管理システムの開発支援です。
以下の条件で実装してください。

【対象】
案件 CRUD API

【目的】
案件を登録・更新・参照・削除できるようにする

【変更対象】
- src/yaguchi_production_system/api/
- src/yaguchi_production_system/models/
- src/yaguchi_production_system/services/
- tests/

【要件】
- Python 3.11
- FastAPI
- pydantic v2
- 型注釈必須
- 例外は AppError 系で扱う
- pytest を追加
- 既存規約に従う

【完了条件】
- CRUD API が動作する
- pytest が通る
- Ruff / mypy エラーなし
```

## 2. DB モデル追加
```text
customers, workers, jobs, job_assignments, attendance の SQLAlchemy モデルを追加してください。

要件:
- 命名は snake_case
- created_at / updated_at を持つ
- 型注釈必須
- Alembic 自動生成可能な構成
- テストしやすい最小設計
```

## 3. UI モック作成
```text
React + TypeScript で案件一覧画面のモックを作成してください。

要件:
- 初心者にも見やすい
- 納期超過を赤で目立たせる
- 担当者、顧客、状態で絞り込み可能
- 将来カレンダー画面へ遷移可能
- 実データ未接続でもよい
```

## 4. バグ修正依頼
```text
以下の不具合を修正してください。

【事象】
案件一覧で納期未設定案件を開くと 500 エラー

【原因調査対象】
- API レスポンスモデル
- DB モデル
- 日付変換処理

【修正条件】
- 影響範囲を最小化
- 既存テストを壊さない
- 再発防止テストを追加
```
