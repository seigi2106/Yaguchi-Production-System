import { useState } from 'react'

import { FilterBar } from '../components/FilterBar'
import { JobCreateForm } from '../components/JobCreateForm'
import { JobEditForm } from '../components/JobEditForm'
import { JobTable } from '../components/JobTable'
import { useJobFilters } from '../hooks/useJobFilters'
import { useWorkersData } from '../hooks/useWorkersData'
import type {
  CreateJobFormValues,
  JobItem,
  UpdateJobAssignmentsValues,
  UpdateJobFormValues,
} from '../types/job'

type JobsListPageProps = {
  jobs: JobItem[]
  isLoading: boolean
  errorMessage: string | null
  onReload: () => void
  onCreateJob: (payload: CreateJobFormValues) => Promise<void>
  onUpdateJob: (jobId: number, payload: UpdateJobFormValues) => Promise<void>
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
  onUpdateJob,
  onUpdateAssignments,
}: JobsListPageProps) => {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null)
  const { filter, setFilter, customers, assignees, statuses, filteredJobs } =
    useJobFilters(jobs)
  const {
    workers,
    isLoading: isWorkersLoading,
    errorMessage: workersErrorMessage,
  } = useWorkersData()
  const selectedJob =
    jobs.find((job) => job.id === selectedJobId) ?? jobs[0] ?? null

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

      {selectedJob !== null ? (
        <JobEditForm job={selectedJob} onSubmit={onUpdateJob} />
      ) : null}

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
          selectedJobId={selectedJob?.id ?? null}
          onSelectJob={(job) => {
            setSelectedJobId(job.id)
          }}
          onUpdateAssignments={onUpdateAssignments}
        />
      ) : null}
    </main>
  )
}
