import type { JobStatus } from '../types/job'
import { STATUS_LABEL } from '../types/job'

type FilterValue = {
  customer: string
  assignee: string
  status: JobStatus | 'all'
}

type FilterBarProps = {
  filter: FilterValue
  customers: readonly string[]
  assignees: readonly string[]
  statuses: readonly (JobStatus | 'all')[]
  onChange: (next: FilterValue) => void
}

export const FilterBar = ({
  filter,
  customers,
  assignees,
  statuses,
  onChange,
}: FilterBarProps) => {
  return (
    <section className="filter-panel">
      <h2>絞り込み</h2>
      <div className="filter-grid">
        <label>
          顧客
          <select
            value={filter.customer}
            onChange={(event) =>
              onChange({ ...filter, customer: event.currentTarget.value })
            }
          >
            {customers.map((customer) => (
              <option key={customer} value={customer}>
                {customer === 'all' ? 'すべて' : customer}
              </option>
            ))}
          </select>
        </label>
        <label>
          担当者
          <select
            value={filter.assignee}
            onChange={(event) =>
              onChange({ ...filter, assignee: event.currentTarget.value })
            }
          >
            {assignees.map((assignee) => (
              <option key={assignee} value={assignee}>
                {assignee === 'all' ? 'すべて' : assignee}
              </option>
            ))}
          </select>
        </label>
        <label>
          状態
          <select
            value={filter.status}
            onChange={(event) =>
              onChange({
                ...filter,
                status: event.currentTarget.value as JobStatus | 'all',
              })
            }
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === 'all' ? 'すべて' : STATUS_LABEL[status]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}

