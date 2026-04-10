import { useEffect, useState } from 'react'

import type { UpdateJobAssignmentsValues } from '../types/job'
import type { WorkerSummary } from '../types/master'

type JobAssignmentEditorProps = {
  jobId: number
  workerIds: number[]
  workers: WorkerSummary[]
  onSave: (jobId: number, payload: UpdateJobAssignmentsValues) => Promise<void>
}

export const JobAssignmentEditor = ({
  jobId,
  workerIds,
  workers,
  onSave,
}: JobAssignmentEditorProps) => {
  const [selectedWorkerIds, setSelectedWorkerIds] = useState<string[]>(
    workerIds.map(String),
  )
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    setSelectedWorkerIds(workerIds.map(String))
  }, [workerIds])

  const handleSave = async () => {
    setIsSaving(true)
    setErrorMessage(null)
    try {
      await onSave(jobId, {
        workerIds: selectedWorkerIds.map(Number),
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : '工員割当に失敗しました'
      setErrorMessage(message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="assignment-editor">
      <select
        multiple
        size={Math.min(Math.max(workers.length, 2), 4)}
        value={selectedWorkerIds}
        onChange={(event) => {
          const nextSelected = Array.from(event.currentTarget.selectedOptions).map(
            (option) => option.value,
          )
          setSelectedWorkerIds(nextSelected)
        }}
      >
        {workers.map((worker) => (
          <option key={worker.id} value={String(worker.id)}>
            {worker.name} ({worker.employee_code})
          </option>
        ))}
      </select>
      <button type="button" onClick={() => void handleSave()} disabled={isSaving}>
        {isSaving ? '保存中...' : '割当保存'}
      </button>
      {errorMessage !== null ? <p className="assignment-error">{errorMessage}</p> : null}
    </div>
  )
}

