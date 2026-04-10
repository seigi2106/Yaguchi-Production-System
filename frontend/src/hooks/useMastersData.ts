import { useCallback, useEffect, useState } from 'react'

import {
  createCustomer as createCustomerRequest,
  createWorker as createWorkerRequest,
  fetchCustomers,
  fetchWorkers,
} from '../api/masterApi'
import type {
  CustomerCreateFormValues,
  CustomerSummary,
  WorkerCreateFormValues,
  WorkerSummary,
} from '../types/master'

type MastersDataState = {
  customers: CustomerSummary[]
  workers: WorkerSummary[]
  isLoading: boolean
  errorMessage: string | null
  reload: () => Promise<void>
  createCustomer: (payload: CustomerCreateFormValues) => Promise<void>
  createWorker: (payload: WorkerCreateFormValues) => Promise<void>
}

export const useMastersData = (): MastersDataState => {
  const [customers, setCustomers] = useState<CustomerSummary[]>([])
  const [workers, setWorkers] = useState<WorkerSummary[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const loadMasters = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)
    try {
      const [customerResponse, workerResponse] = await Promise.all([
        fetchCustomers(),
        fetchWorkers(),
      ])
      setCustomers(customerResponse)
      setWorkers(workerResponse)
    } catch (error) {
      const message = error instanceof Error ? error.message : '不明なエラー'
      setCustomers([])
      setWorkers([])
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadMasters()
  }, [loadMasters])

  const createCustomer = useCallback(
    async (payload: CustomerCreateFormValues) => {
      await createCustomerRequest(payload)
      await loadMasters()
    },
    [loadMasters],
  )

  const createWorker = useCallback(
    async (payload: WorkerCreateFormValues) => {
      await createWorkerRequest(payload)
      await loadMasters()
    },
    [loadMasters],
  )

  return {
    customers,
    workers,
    isLoading,
    errorMessage,
    reload: loadMasters,
    createCustomer,
    createWorker,
  }
}

