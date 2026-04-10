import { useState } from 'react'

import { JobsListPage } from './pages/JobsListPage'
import { SchedulePage } from './pages/SchedulePage'

type ViewMode = 'list' | 'schedule'

function App() {
  const [mode, setMode] = useState<ViewMode>('list')

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

      {mode === 'list' ? <JobsListPage /> : <SchedulePage />}
    </>
  )
}

export default App
