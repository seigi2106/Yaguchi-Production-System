import { FilterBar } from '../components/FilterBar'
import { JobCreateForm } from '../components/JobCreateForm'
import { JobTable } from '../components/JobTable'
import { useJobFilters } from '../hooks/useJobFilters'
import { useWorkersData } from '../hooks/useWorkersData'
import type {
  CreateJobFormValues,
  JobItem,
  UpdateJobAssignmentsValues,
} from '../types/job'

type JobsListPageProps = {
  jobs: JobItem[]
  isLoading: boolean
  errorMessage: string | null
  onReload: () => void
  onCreateJob: (payload: CreateJobFormValues) => Promise<void>
  onUpdateAssignments: (
    jobId: number,
    payload: UpdateJobAssignmentsValues,
  ) => Promise<void>
}

export const JobsListPage = ({
  jobs,
  isLoading,
  errorMessage,
  onReload,
  onCreateJob,
  onUpdateAssignments,
}: JobsListPageProps) => {
  const { filter, setFilter, customers, assignees, statuses, filteredJobs } =
    useJobFilters(jobs)
  const {
    workers,
    isLoading: isWorkersLoading,
    errorMessage: workersErrorMessage,
  } = useWorkersData()

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Yaguchi Production System</p>
        <h1>生産案件ダッシュボード</h1>
        <p className="lead">
          顧客・担当者・状態で絞り込み、納期超過案件を即時把握できます。
        </p>
      </header>

      <FilterBar
        filter={filter}
        customers={customers}
        assignees={assignees}
        statuses={statuses}
        onChange={setFilter}
      />

      <JobCreateForm onSubmit={onCreateJob} />

      {isLoading ? <section className="info-panel">案件を読み込み中です...</section> : null}

      {errorMessage !== null ? (
        <section className="info-panel error-panel">
          <p>{errorMessage}</p>
          <button type="button" onClick={onReload}>
            再読み込み
          </button>
        </section>
      ) : null}

      {workersErrorMessage !== null ? (
        <section className="info-panel error-panel">
          <p>{workersErrorMessage}</p>
        </section>
      ) : null}

      {!isLoading && !isWorkersLoading && errorMessage === null ? (
        <JobTable
          jobs={filteredJobs}
          workers={workers}
          onUpdateAssignments={onUpdateAssignments}
        />
      ) : null}
    </main>
  )
}
