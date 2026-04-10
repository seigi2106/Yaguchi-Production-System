import { useEffect, useState } from 'react'

import { fetchWorkers } from '../api/masterApi'
import type { WorkerSummary } from '../types/master'

type WorkersDataState = {
  workers: WorkerSummary[]
  isLoading: boolean
  errorMessage: string | null
}

export const useWorkersData = (): WorkersDataState => {
  const [workers, setWorkers] = useState<WorkerSummary[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadWorkers = async () => {
      setIsLoading(true)
      setErrorMessage(null)
      try {
        const response = await fetchWorkers()
        setWorkers(response)
      } catch (error) {
        const message = error instanceof Error ? error.message : '不明なエラー'
        setWorkers([])
        setErrorMessage(message)
      } finally {
        setIsLoading(false)
      }
    }

    void loadWorkers()
  }, [])

  return {
    workers,
    isLoading,
    errorMessage,
  }
}

