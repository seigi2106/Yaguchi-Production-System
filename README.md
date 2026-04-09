# Yaguchi Production System

ヤグチ電子向けの生産管理システム開発リポジトリです。

本システムは、従来 Excel で管理していた案件・工員・進捗・売上情報を一元化し、
初心者でも正確に運用できる Web アプリケーションとして構築します。

## 目的
- 案件管理の属人化解消
- 納期遅延、出荷待ち、進捗停滞の見える化
- 工員負荷の可視化
- 売上、粗利、月次推移の把握
- 将来的な実装最適化支援機能との連携基盤整備

## 技術構成
- Backend: Python 3.11 / FastAPI
- Frontend: React + PWA
- Database: PostgreSQL
- Dev Tools: VSCode / GitHub / Codex

## 開発方針
- Excel の再現ではなく、DB中心の正規化設計を採用
- 日程表はビューとして再構成
- Python コーディング規格準拠
- Issue 駆動で開発を進行
