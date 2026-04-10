import type { JobItem } from '../types/job'
import { STATUS_LABEL } from '../types/job'

type MonthlyScheduleTableProps = {
  jobs: JobItem[]
  daysInMonth: number
  monthKey: string
}

const statusClassName = (status: JobItem['status']): string => {
  return `status status-${status}`
}

const toDayNumber = (date: string | null): number | null => {
  if (date === null) {
    return null
  }
  return new Date(date).getDate()
}

const isOverdue = (dueDate: string | null, status: JobItem['status']): boolean => {
  if (dueDate === null) {
    return false
  }
  if (status === 'completed') {
    return false
  }
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dueDate).getTime() < today.getTime()
}

export const MonthlyScheduleTable = ({
  jobs,
  daysInMonth,
  monthKey,
}: MonthlyScheduleTableProps) => {
  const [year, month] = monthKey.split('-').map(Number)
  const dayHeaders = Array.from({ length: daysInMonth }, (_, index) => index + 1)

  return (
    <section className="table-panel">
      <div className="table-header">
        <h2>
          日程表 ({year}年{month}月)
        </h2>
        <p>{jobs.length} 件</p>
      </div>
      <div className="table-scroll">
        <table className="schedule-table">
          <thead>
            <tr>
              <th className="fixed-col">案件</th>
              <th className="fixed-col">顧客/担当</th>
              <th className="fixed-col">状態</th>
              {dayHeaders.map((day) => (
                <th key={day} className="day-header">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              const startDay = toDayNumber(job.startDate)
              const dueDay = toDayNumber(job.dueDate)
              const overdue = isOverdue(job.dueDate, job.status)
              return (
                <tr key={job.id}>
                  <td className="fixed-col">
                    <p className="job-title">{job.title}</p>
                    <p className="job-code">{job.jobCode}</p>
                  </td>
                  <td className="fixed-col">
                    <p>{job.customerName}</p>
                    <p className="meta-sub">{job.assignee}</p>
                  </td>
                  <td className="fixed-col">
                    <span className={statusClassName(job.status)}>
                      {STATUS_LABEL[job.status]}
                    </span>
                  </td>
                  {dayHeaders.map((day) => {
                    const hasStart = startDay !== null
                    const hasDue = dueDay !== null
                    const inRange =
                      hasStart && hasDue ? day >= startDay && day <= dueDay : false
                    const isDue = hasDue ? day === dueDay : false
                    return (
                      <td
                        key={`${job.id}-${day}`}
                        className={[
                          'day-cell',
                          inRange ? `range-${job.status}` : '',
                          isDue ? 'due-cell' : '',
                          isDue && overdue ? 'due-overdue' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {isDue ? '納' : ''}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
