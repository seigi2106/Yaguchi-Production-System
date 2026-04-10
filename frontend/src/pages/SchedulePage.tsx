import { MonthlyScheduleTable } from '../components/MonthlyScheduleTable'
import { ScheduleFilterBar } from '../components/ScheduleFilterBar'
import { useScheduleFilters } from '../hooks/useScheduleFilters'
import type { JobItem } from '../types/job'

type SchedulePageProps = {
  jobs: JobItem[]
  isLoading: boolean
  errorMessage: string | null
  onReload: () => void
}

export const SchedulePage = ({
  jobs,
  isLoading,
  errorMessage,
  onReload,
}: SchedulePageProps) => {
  const {
    filter,
    setFilter,
    months,
    customers,
    assignees,
    daysInMonth,
    filteredJobs,
  } = useScheduleFilters(jobs)

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

      {isLoading ? <section className="info-panel">日程表データを読み込み中です...</section> : null}

      {errorMessage !== null ? (
        <section className="info-panel error-panel">
          <p>{errorMessage}</p>
          <button type="button" onClick={onReload}>
            再読み込み
          </button>
        </section>
      ) : null}

      {!isLoading && errorMessage === null ? (
        <MonthlyScheduleTable
          jobs={filteredJobs}
          daysInMonth={daysInMonth}
          monthKey={filter.month}
        />
      ) : null}
    </main>
  )
}
