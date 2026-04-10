import { useState, type FormEvent } from 'react'

import { useCustomersData } from '../hooks/useCustomersData'
import {
  CREATE_JOB_STATUSES,
  STATUS_LABEL,
  type CreateJobFormValues,
} from '../types/job'

type JobCreateFormProps = {
  onSubmit: (payload: CreateJobFormValues) => Promise<void>
}

const INITIAL_VALUES: CreateJobFormValues = {
  jobCode: '',
  title: '',
  customerId: '',
  startDate: '',
  dueDate: '',
  status: 'planned',
  notes: '',
}

export const JobCreateForm = ({ onSubmit }: JobCreateFormProps) => {
  const { customers, isLoading, errorMessage } = useCustomersData()
  const [values, setValues] = useState<CreateJobFormValues>(INITIAL_VALUES)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await onSubmit(values)
      setValues(INITIAL_VALUES)
    } catch (error) {
      const message = error instanceof Error ? error.message : '案件登録に失敗しました'
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="form-panel">
      <div className="form-panel-header">
        <div>
          <h2>案件登録</h2>
          <p className="lead-inline">顧客マスタを選択して案件を追加します。</p>
        </div>
      </div>

      {errorMessage !== null ? (
        <div className="info-panel error-panel">
          <p>{errorMessage}</p>
        </div>
      ) : null}

      <form className="job-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            案件番号
            <input
              required
              value={values.jobCode}
              onChange={(event) =>
                setValues({ ...values, jobCode: event.currentTarget.value })
              }
            />
          </label>

          <label>
            顧客
            <select
              value={values.customerId}
              disabled={isLoading}
              onChange={(event) =>
                setValues({ ...values, customerId: event.currentTarget.value })
              }
            >
              <option value="">未設定</option>
              {customers.map((customer) => (
                <option key={customer.id} value={String(customer.id)}>
                  {customer.name}
                </option>
              ))}
            </select>
          </label>

          <label className="span-2">
            案件名
            <input
              required
              value={values.title}
              onChange={(event) =>
                setValues({ ...values, title: event.currentTarget.value })
              }
            />
          </label>

          <label>
            開始日
            <input
              type="date"
              value={values.startDate}
              onChange={(event) =>
                setValues({ ...values, startDate: event.currentTarget.value })
              }
            />
          </label>

          <label>
            納期
            <input
              type="date"
              value={values.dueDate}
              onChange={(event) =>
                setValues({ ...values, dueDate: event.currentTarget.value })
              }
            />
          </label>

          <label>
            状態
            <select
              value={values.status}
              onChange={(event) =>
                setValues({
                  ...values,
                  status: event.currentTarget.value as CreateJobFormValues['status'],
                })
              }
            >
              {CREATE_JOB_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABEL[status]}
                </option>
              ))}
            </select>
          </label>

          <label className="span-2">
            備考
            <textarea
              rows={3}
              value={values.notes}
              onChange={(event) =>
                setValues({ ...values, notes: event.currentTarget.value })
              }
            />
          </label>
        </div>

        {submitError !== null ? (
          <div className="form-error">
            <p>{submitError}</p>
          </div>
        ) : null}

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting || isLoading}>
            {isSubmitting ? '登録中...' : '案件を登録'}
          </button>
        </div>
      </form>
    </section>
  )
}
