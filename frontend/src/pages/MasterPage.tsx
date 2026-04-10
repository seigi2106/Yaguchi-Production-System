import { useState, type FormEvent } from 'react'

import { useMastersData } from '../hooks/useMastersData'
import type {
  CustomerCreateFormValues,
  WorkerCreateFormValues,
} from '../types/master'

const INITIAL_CUSTOMER: CustomerCreateFormValues = {
  name: '',
  contactPerson: '',
  phone: '',
  email: '',
}

const INITIAL_WORKER: WorkerCreateFormValues = {
  employeeCode: '',
  name: '',
  isActive: true,
}

export const MasterPage = () => {
  const {
    customers,
    workers,
    isLoading,
    errorMessage,
    reload,
    createCustomer,
    createWorker,
  } = useMastersData()
  const [customerValues, setCustomerValues] =
    useState<CustomerCreateFormValues>(INITIAL_CUSTOMER)
  const [workerValues, setWorkerValues] =
    useState<WorkerCreateFormValues>(INITIAL_WORKER)
  const [customerError, setCustomerError] = useState<string | null>(null)
  const [workerError, setWorkerError] = useState<string | null>(null)
  const [isCustomerSubmitting, setIsCustomerSubmitting] = useState<boolean>(false)
  const [isWorkerSubmitting, setIsWorkerSubmitting] = useState<boolean>(false)

  const handleCustomerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsCustomerSubmitting(true)
    setCustomerError(null)
    try {
      await createCustomer(customerValues)
      setCustomerValues(INITIAL_CUSTOMER)
    } catch (error) {
      const message = error instanceof Error ? error.message : '顧客登録に失敗しました'
      setCustomerError(message)
    } finally {
      setIsCustomerSubmitting(false)
    }
  }

  const handleWorkerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsWorkerSubmitting(true)
    setWorkerError(null)
    try {
      await createWorker(workerValues)
      setWorkerValues(INITIAL_WORKER)
    } catch (error) {
      const message = error instanceof Error ? error.message : '工員登録に失敗しました'
      setWorkerError(message)
    } finally {
      setIsWorkerSubmitting(false)
    }
  }

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Yaguchi Production System</p>
        <h1>マスタ管理</h1>
        <p className="lead">
          顧客と工員を登録し、案件入力で利用する選択肢を整備します。
        </p>
      </header>

      {errorMessage !== null ? (
        <section className="info-panel error-panel">
          <p>{errorMessage}</p>
          <button type="button" onClick={() => void reload()}>
            再読み込み
          </button>
        </section>
      ) : null}

      <section className="master-grid">
        <section className="form-panel">
          <div className="form-panel-header">
            <div>
              <h2>顧客登録</h2>
              <p className="lead-inline">案件で使用する顧客マスタを追加します。</p>
            </div>
          </div>
          <form className="job-form" onSubmit={handleCustomerSubmit}>
            <div className="form-grid">
              <label>
                顧客名
                <input
                  required
                  value={customerValues.name}
                  onChange={(event) =>
                    setCustomerValues({
                      ...customerValues,
                      name: event.currentTarget.value,
                    })
                  }
                />
              </label>
              <label>
                担当者
                <input
                  value={customerValues.contactPerson}
                  onChange={(event) =>
                    setCustomerValues({
                      ...customerValues,
                      contactPerson: event.currentTarget.value,
                    })
                  }
                />
              </label>
              <label>
                電話
                <input
                  value={customerValues.phone}
                  onChange={(event) =>
                    setCustomerValues({
                      ...customerValues,
                      phone: event.currentTarget.value,
                    })
                  }
                />
              </label>
              <label className="span-2">
                メール
                <input
                  type="email"
                  value={customerValues.email}
                  onChange={(event) =>
                    setCustomerValues({
                      ...customerValues,
                      email: event.currentTarget.value,
                    })
                  }
                />
              </label>
            </div>
            {customerError !== null ? (
              <div className="form-error">
                <p>{customerError}</p>
              </div>
            ) : null}
            <div className="form-actions">
              <button type="submit" disabled={isCustomerSubmitting}>
                {isCustomerSubmitting ? '登録中...' : '顧客を登録'}
              </button>
            </div>
          </form>
        </section>

        <section className="form-panel">
          <div className="form-panel-header">
            <div>
              <h2>工員登録</h2>
              <p className="lead-inline">作業割当で利用する工員マスタを追加します。</p>
            </div>
          </div>
          <form className="job-form" onSubmit={handleWorkerSubmit}>
            <div className="form-grid">
              <label>
                工員コード
                <input
                  required
                  value={workerValues.employeeCode}
                  onChange={(event) =>
                    setWorkerValues({
                      ...workerValues,
                      employeeCode: event.currentTarget.value,
                    })
                  }
                />
              </label>
              <label>
                氏名
                <input
                  required
                  value={workerValues.name}
                  onChange={(event) =>
                    setWorkerValues({
                      ...workerValues,
                      name: event.currentTarget.value,
                    })
                  }
                />
              </label>
              <label className="checkbox-label">
                <span>有効</span>
                <input
                  type="checkbox"
                  checked={workerValues.isActive}
                  onChange={(event) =>
                    setWorkerValues({
                      ...workerValues,
                      isActive: event.currentTarget.checked,
                    })
                  }
                />
              </label>
            </div>
            {workerError !== null ? (
              <div className="form-error">
                <p>{workerError}</p>
              </div>
            ) : null}
            <div className="form-actions">
              <button type="submit" disabled={isWorkerSubmitting}>
                {isWorkerSubmitting ? '登録中...' : '工員を登録'}
              </button>
            </div>
          </form>
        </section>
      </section>

      <section className="master-grid">
        <section className="table-panel">
          <div className="table-header">
            <h2>顧客一覧</h2>
            <p>{isLoading ? '読込中' : `${customers.length} 件`}</p>
          </div>
          <div className="master-list">
            {customers.map((customer) => (
              <div key={customer.id} className="master-card">
                <strong>{customer.name}</strong>
                <span>ID: {customer.id}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="table-panel">
          <div className="table-header">
            <h2>工員一覧</h2>
            <p>{isLoading ? '読込中' : `${workers.length} 件`}</p>
          </div>
          <div className="master-list">
            {workers.map((worker) => (
              <div key={worker.id} className="master-card">
                <strong>{worker.name}</strong>
                <span>{worker.employee_code}</span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
