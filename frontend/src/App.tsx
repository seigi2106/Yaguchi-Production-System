import { useState } from 'react'

import { useJobsData } from './hooks/useJobsData'
import { JobsListPage } from './pages/JobsListPage'
import { SchedulePage } from './pages/SchedulePage'

type ViewMode = 'list' | 'schedule'

function App() {
  const [mode, setMode] = useState<ViewMode>('list')
  const { jobs, isLoading, errorMessage, reload, createJob } = useJobsData()

  return (
    <>
      <nav className="view-switch">
        <button
          type="button"
          className={mode === 'list' ? 'active' : ''}
          onClick={() => setMode('list')}
        >
          案件一覧
        </button>
        <button
          type="button"
          className={mode === 'schedule' ? 'active' : ''}
          onClick={() => setMode('schedule')}
        >
          日程表
        </button>
      </nav>

      {mode === 'list' ? (
        <JobsListPage
          jobs={jobs}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onReload={() => {
            void reload()
          }}
          onCreateJob={createJob}
        />
      ) : (
        <SchedulePage
          jobs={jobs}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onReload={() => {
            void reload()
          }}
        />
      )}
    </>
  )
}

export default App
