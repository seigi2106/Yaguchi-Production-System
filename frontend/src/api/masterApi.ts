import type { CustomerSummary } from '../types/master'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

export const fetchCustomers = async (): Promise<CustomerSummary[]> => {
  const response = await fetch(`${API_BASE_URL}/customers`)
  if (!response.ok) {
    throw new Error(`顧客一覧の取得に失敗しました (${response.status})`)
  }
  return (await response.json()) as CustomerSummary[]
}

