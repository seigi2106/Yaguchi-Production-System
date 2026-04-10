import { useMemo, useState } from 'react'

import type { JobItem, JobStatus } from '../types/job'

type JobFilter = {
  customer: string
  assignee: string
  status: JobStatus | 'all'
}

const DEFAULT_FILTER: JobFilter = {
  customer: 'all',
  assignee: 'all',
  status: 'all',
}

export const useJobFilters = (jobs: JobItem[]) => {
  const [filter, setFilter] = useState<JobFilter>(DEFAULT_FILTER)

  const customers = useMemo(
    () => ['all', ...new Set(jobs.map((job) => job.customerName))],
    [jobs],
  )
  const assignees = useMemo(
    () => ['all', ...new Set(jobs.map((job) => job.assignee))],
    [jobs],
  )
  const statuses = useMemo(
    () => ['all', ...new Set(jobs.map((job) => job.status))] as const,
    [jobs],
  )

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const customerMatch =
        filter.customer === 'all' || job.customerName === filter.customer
      const assigneeMatch =
        filter.assignee === 'all' || job.assignee === filter.assignee
      const statusMatch = filter.status === 'all' || job.status === filter.status
      return customerMatch && assigneeMatch && statusMatch
    })
  }, [filter, jobs])

  return {
    filter,
    setFilter,
    customers,
    assignees,
    statuses,
    filteredJobs,
  }
}

