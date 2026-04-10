---
name: DB設計確定
about: 生産管理システムの初期DB設計を確定する
labels: backend, db, phase1
---

## 目的
customers / workers / jobs / job_assignments / attendance の初期DB設計を確定する。

## 完了条件
- [ ] テーブル定義が確定している
- [ ] カラム一覧が整理されている
- [ ] 主キー / 外部キーが定義されている
- [ ] Alembic 生成可能な形で合意できている

## メモ
- Excel依存の列はそのまま持ち込まない
- 正規化優先
