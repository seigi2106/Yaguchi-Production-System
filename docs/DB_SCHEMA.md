# DB Schema (Phase1)

## 設計方針
- Excelの列をそのまま移植せず、業務概念ごとに正規化する
- 監査と追跡のため、全テーブルに `created_at` / `updated_at` を持たせる
- 主要テーブルは整数主キー（`id`）で統一する

## tables

### customers
- `id` (PK)
- `name` (UNIQUE, NOT NULL)
- `contact_person` (NULL)
- `phone` (NULL)
- `email` (NULL)
- `created_at` / `updated_at`

### workers
- `id` (PK)
- `employee_code` (UNIQUE, NOT NULL)
- `name` (NOT NULL)
- `is_active` (NOT NULL, default: true)
- `created_at` / `updated_at`

### jobs
- `id` (PK)
- `job_code` (UNIQUE, NOT NULL)
- `title` (NOT NULL)
- `customer_id` (FK -> `customers.id`, NULL)
- `start_date` (NULL)
- `due_date` (NULL)
- `status` (NOT NULL, default: `planned`)
- `notes` (NULL)
- `created_at` / `updated_at`

### job_assignments
- `id` (PK)
- `job_id` (FK -> `jobs.id`, NOT NULL)
- `worker_id` (FK -> `workers.id`, NOT NULL)
- `assigned_date` (NOT NULL)
- `created_at` / `updated_at`
- UNIQUE(`job_id`, `worker_id`)

### attendance
- `id` (PK)
- `worker_id` (FK -> `workers.id`, NOT NULL)
- `work_date` (NOT NULL)
- `check_in` (NULL)
- `check_out` (NULL)
- `worked_minutes` (NOT NULL, default: 0)
- `created_at` / `updated_at`

## Alembic 対応
- SQLAlchemy Declarative でモデル定義済み
- FK/UNIQUE をモデル側で定義済み
- `Base.metadata` から自動マイグレーション生成可能な構成

