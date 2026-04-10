import { JobAssignmentEditor } from './JobAssignmentEditor'
import type { JobItem } from '../types/job'
import type { WorkerSummary } from '../types/master'
import { STATUS_LABEL } from '../types/job'

type JobTableProps = {
  jobs: JobItem[]
  workers: WorkerSummary[]
  onUpdateAssignments: (jobId: number, payload: { workerIds: number[] }) => Promise<void>
}

const isOverdue = (dueDate: string, status: JobItem['status']): boolean => {
  if (status === 'completed') {
    return false
  }
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dueDate).getTime() < today.getTime()
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ja-JP')
}

export const JobTable = ({ jobs, workers, onUpdateAssignments }: JobTableProps) => {
  return (
    <section className="table-panel">
      <div className="table-header">
        <h2>案件一覧</h2>
        <p>{jobs.length} 件</p>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>案件番号</th>
              <th>案件名</th>
              <th>顧客</th>
              <th>担当者</th>
              <th>割当更新</th>
              <th>納期</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              const overdue =
                job.dueDate === null ? false : isOverdue(job.dueDate, job.status)
              return (
                <tr key={job.id}>
                  <td>{job.jobCode}</td>
                  <td>{job.title}</td>
                  <td>{job.customerName}</td>
                  <td>{job.assignee}</td>
                  <td>
                    <JobAssignmentEditor
                      jobId={job.id}
                      workerIds={job.assigneeIds}
                      workers={workers}
                      onSave={async (targetJobId, payload) => {
                        await onUpdateAssignments(targetJobId, payload)
                      }}
                    />
                  </td>
                  <td className={overdue ? 'overdue' : ''}>
                    {job.dueDate === null ? '-' : formatDate(job.dueDate)}
                    {overdue ? ' (超過)' : ''}
                  </td>
                  <td>
                    <span className={`status status-${job.status}`}>
                      {STATUS_LABEL[job.status]}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
