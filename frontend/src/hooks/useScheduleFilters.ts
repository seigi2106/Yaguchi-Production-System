import { useMemo, useState } from 'react'

import type { JobItem } from '../types/job'

type ScheduleFilter = {
  customer: string
  assignee: string
  month: string
}

const getMonthKey = (date: string | null): string | null => {
  if (date === null) {
    return null
  }
  return date.slice(0, 7)
}

const currentMonthKey = (): string => {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  return `${now.getFullYear()}-${month}`
}

export const useScheduleFilters = (jobs: JobItem[]) => {
  const rawMonths = useMemo(
    () =>
      [...new Set(jobs.map((job) => getMonthKey(job.dueDate)).filter(Boolean))] as string[],
    [jobs],
  )
  const initialMonth = rawMonths[0] ?? currentMonthKey()
  const [filter, setFilter] = useState<ScheduleFilter>({
    customer: 'all',
    assignee: 'all',
    month: initialMonth,
  })
  const months = rawMonths.length > 0 ? rawMonths : [filter.month]

  const customers = useMemo(
    () => ['all', ...new Set(jobs.map((job) => job.customerName))],
    [jobs],
  )
  const assignees = useMemo(
    () => ['all', ...new Set(jobs.map((job) => job.assignee))],
    [jobs],
  )

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const monthMatch = getMonthKey(job.dueDate) === filter.month
      const customerMatch =
        filter.customer === 'all' || job.customerName === filter.customer
      const assigneeMatch =
        filter.assignee === 'all' || job.assignee === filter.assignee
      return monthMatch && customerMatch && assigneeMatch
    })
  }, [filter, jobs])

  const daysInMonth = useMemo(() => {
    const [yearText, monthText] = filter.month.split('-')
    const year = Number(yearText)
    const month = Number(monthText)
    return new Date(year, month, 0).getDate()
  }, [filter.month])

  return {
    filter,
    setFilter,
    months,
    customers,
    assignees,
    daysInMonth,
    filteredJobs,
  }
}
