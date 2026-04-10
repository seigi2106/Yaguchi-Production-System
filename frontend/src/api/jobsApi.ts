import type { ApiJob, JobItem, JobStatus } from '../types/job'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

const toJobStatus = (value: string): JobStatus => {
  const knownStatuses: JobStatus[] = [
    'planned',
    'in_progress',
    'waiting_parts',
    'completed',
    'on_hold',
    'cancelled',
  ]
  if (knownStatuses.includes(value as JobStatus)) {
    return value as JobStatus
  }
  return 'planned'
}

const mapApiJobToItem = (job: ApiJob): JobItem => {
  return {
    id: job.id,
    jobCode: job.job_code,
    title: job.title,
    customerName: job.customer_id === null ? '未設定' : `顧客#${job.customer_id}`,
    assignee: '未割当',
    startDate: job.start_date,
    dueDate: job.due_date,
    status: toJobStatus(job.status),
  }
}

export const fetchJobs = async (): Promise<JobItem[]> => {
  const response = await fetch(`${API_BASE_URL}/jobs`)
  if (!response.ok) {
    throw new Error(`案件取得に失敗しました (${response.status})`)
  }
  const payload = (await response.json()) as ApiJob[]
  return payload.map(mapApiJobToItem)
}

