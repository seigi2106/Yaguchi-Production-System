export type JobStatus =
  | 'planned'
  | 'in_progress'
  | 'waiting_parts'
  | 'completed'
  | 'on_hold'

export type JobItem = {
  id: number
  jobCode: string
  title: string
  customerName: string
  assignee: string
  startDate: string
  dueDate: string
  status: JobStatus
}

export const STATUS_LABEL: Record<JobStatus, string> = {
  planned: '計画中',
  in_progress: '進行中',
  waiting_parts: '部材待ち',
  completed: '完了',
  on_hold: '保留',
}
