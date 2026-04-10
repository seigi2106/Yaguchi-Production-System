import { FilterBar } from '../components/FilterBar'
import { JobTable } from '../components/JobTable'
import { mockJobs } from '../api/mockJobs'
import { useJobFilters } from '../hooks/useJobFilters'

export const JobsListPage = () => {
  const { filter, setFilter, customers, assignees, statuses, filteredJobs } =
    useJobFilters(mockJobs)

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

      <JobTable jobs={filteredJobs} />
    </main>
  )
}

