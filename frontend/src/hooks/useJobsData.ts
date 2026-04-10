import { useCallback, useEffect, useState } from 'react'

import { fetchJobs } from '../api/jobsApi'
import type { JobItem } from '../types/job'

type JobsDataState = {
  jobs: JobItem[]
  isLoading: boolean
  errorMessage: string | null
  reload: () => Promise<void>
}

export const useJobsData = (): JobsDataState => {
  const [jobs, setJobs] = useState<JobItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const loadJobs = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)
    try {
      const response = await fetchJobs()
      setJobs(response)
    } catch (error) {
      const message = error instanceof Error ? error.message : '不明なエラー'
      setErrorMessage(message)
      setJobs([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadJobs()
  }, [loadJobs])

  return {
    jobs,
    isLoading,
    errorMessage,
    reload: loadJobs,
  }
}

