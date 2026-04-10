import type {
  ApiJob,
  CreateJobFormValues,
  JobItem,
  JobStatus,
} from '../types/job'

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
  const assignee =
    job.assignee_names.length > 0 ? job.assignee_names.join(' / ') : '未割当'

  return {
    id: job.id,
    jobCode: job.job_code,
    title: job.title,
    customerName: job.customer_name ?? '未設定',
    assignee,
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

export const createJob = async (payload: CreateJobFormValues): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      job_code: payload.jobCode,
      title: payload.title,
      customer_id: payload.customerId === '' ? null : Number(payload.customerId),
      start_date: payload.startDate === '' ? null : payload.startDate,
      due_date: payload.dueDate === '' ? null : payload.dueDate,
      status: payload.status,
      notes: payload.notes === '' ? null : payload.notes,
    }),
  })

  if (!response.ok) {
    throw new Error(`案件登録に失敗しました (${response.status})`)
  }
}
