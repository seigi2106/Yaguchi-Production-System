type ScheduleFilter = {
  customer: string
  assignee: string
  month: string
}

type ScheduleFilterBarProps = {
  filter: ScheduleFilter
  months: readonly string[]
  customers: readonly string[]
  assignees: readonly string[]
  onChange: (next: ScheduleFilter) => void
}

export const ScheduleFilterBar = ({
  filter,
  months,
  customers,
  assignees,
  onChange,
}: ScheduleFilterBarProps) => {
  return (
    <section className="filter-panel">
      <h2>日程表フィルタ</h2>
      <div className="filter-grid filter-grid-schedule">
        <label>
          対象月
          <select
            value={filter.month}
            onChange={(event) =>
              onChange({ ...filter, month: event.currentTarget.value })
            }
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month.replace('-', '年')}月
              </option>
            ))}
          </select>
        </label>
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
      </div>
    </section>
  )
}

