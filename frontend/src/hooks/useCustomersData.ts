import { useEffect, useState } from 'react'

import { fetchCustomers } from '../api/masterApi'
import type { CustomerSummary } from '../types/master'

type CustomersDataState = {
  customers: CustomerSummary[]
  isLoading: boolean
  errorMessage: string | null
}

export const useCustomersData = (): CustomersDataState => {
  const [customers, setCustomers] = useState<CustomerSummary[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadCustomers = async () => {
      setIsLoading(true)
      setErrorMessage(null)
      try {
        const response = await fetchCustomers()
        setCustomers(response)
      } catch (error) {
        const message = error instanceof Error ? error.message : '不明なエラー'
        setCustomers([])
        setErrorMessage(message)
      } finally {
        setIsLoading(false)
      }
    }

    void loadCustomers()
  }, [])

  return {
    customers,
    isLoading,
    errorMessage,
  }
}

