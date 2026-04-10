import type {
  CustomerCreateFormValues,
  CustomerSummary,
  WorkerCreateFormValues,
  WorkerSummary,
} from '../types/master'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

export const fetchCustomers = async (): Promise<CustomerSummary[]> => {
  const response = await fetch(`${API_BASE_URL}/customers`)
  if (!response.ok) {
    throw new Error(`顧客一覧の取得に失敗しました (${response.status})`)
  }
  return (await response.json()) as CustomerSummary[]
}

export const fetchWorkers = async (): Promise<WorkerSummary[]> => {
  const response = await fetch(`${API_BASE_URL}/workers`)
  if (!response.ok) {
    throw new Error(`工員一覧の取得に失敗しました (${response.status})`)
  }
  return (await response.json()) as WorkerSummary[]
}

export const createCustomer = async (
  payload: CustomerCreateFormValues,
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: payload.name,
      contact_person: payload.contactPerson === '' ? null : payload.contactPerson,
      phone: payload.phone === '' ? null : payload.phone,
      email: payload.email === '' ? null : payload.email,
    }),
  })

  if (!response.ok) {
    throw new Error(`顧客登録に失敗しました (${response.status})`)
  }
}

export const createWorker = async (
  payload: WorkerCreateFormValues,
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/workers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      employee_code: payload.employeeCode,
      name: payload.name,
      is_active: payload.isActive,
    }),
  })

  if (!response.ok) {
    throw new Error(`工員登録に失敗しました (${response.status})`)
  }
}
