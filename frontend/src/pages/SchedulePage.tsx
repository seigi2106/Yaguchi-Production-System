import { mockJobs } from '../api/mockJobs'
import { MonthlyScheduleTable } from '../components/MonthlyScheduleTable'
import { ScheduleFilterBar } from '../components/ScheduleFilterBar'
import { useScheduleFilters } from '../hooks/useScheduleFilters'

export const SchedulePage = () => {
  const {
    filter,
    setFilter,
    months,
    customers,
    assignees,
    daysInMonth,
    filteredJobs,
  } = useScheduleFilters(mockJobs)

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Yaguchi Production System</p>
        <h1>月間日程表</h1>
        <p className="lead">
          1案件1行で進行帯を表示し、納期日を「納」で強調します。
        </p>
      </header>

      <ScheduleFilterBar
        filter={filter}
        months={months}
        customers={customers}
        assignees={assignees}
        onChange={setFilter}
      />

      <MonthlyScheduleTable
        jobs={filteredJobs}
        daysInMonth={daysInMonth}
        monthKey={filter.month}
      />
    </main>
  )
}

