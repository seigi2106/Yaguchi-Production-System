export type JobStatus =
  | 'planned'
  | 'in_progress'
  | 'waiting_parts'
  | 'completed'
  | 'on_hold'
  | 'cancelled'

export type JobItem = {
  id: number
  jobCode: string
  title: string
  customerId: number | null
  customerName: string
  assignee: string
  assigneeIds: number[]
  startDate: string | null
  dueDate: string | null
  status: JobStatus
  notes: string | null
}

export type CreateJobFormValues = {
  jobCode: string
  title: string
  customerId: string
  startDate: string
  dueDate: string
  status: Exclude<JobStatus, 'waiting_parts'>
  notes: string
}

export type UpdateJobAssignmentsValues = {
  workerIds: number[]
}

export type UpdateJobFormValues = {
  title: string
  customerId: string
  startDate: string
  dueDate: string
  status: Exclude<JobStatus, 'waiting_parts'>
  notes: string
}

export type ApiJob = {
  id: number
  job_code: string
  title: string
  customer_id: number | null
  customer_name: string | null
  start_date: string | null
  due_date: string | null
  status: string
  notes: string | null
  assignee_names: string[]
  assignee_ids: number[]
  created_at: string
  updated_at: string
}

export const STATUS_LABEL: Record<JobStatus, string> = {
  planned: '計画中',
  in_progress: '進行中',
  waiting_parts: '部材待ち',
  completed: '完了',
  on_hold: '保留',
  cancelled: '中止',
}

export const CREATE_JOB_STATUSES: Exclude<JobStatus, 'waiting_parts'>[] = [
  'planned',
  'in_progress',
  'completed',
  'on_hold',
  'cancelled',
]
