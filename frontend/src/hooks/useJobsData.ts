import { useCallback, useEffect, useState } from 'react'

import {
  createJob as createJobRequest,
  fetchJobs,
  updateJob as updateJobRequest,
  updateJobAssignments as updateJobAssignmentsRequest,
} from '../api/jobsApi'
import type {
  CreateJobFormValues,
  JobItem,
  UpdateJobAssignmentsValues,
  UpdateJobFormValues,
} from '../types/job'

type JobsDataState = {
  jobs: JobItem[]
  isLoading: boolean
  errorMessage: string | null
  reload: () => Promise<void>
  createJob: (payload: CreateJobFormValues) => Promise<void>
  updateJob: (jobId: number, payload: UpdateJobFormValues) => Promise<void>
  updateJobAssignments: (
    jobId: number,
    payload: UpdateJobAssignmentsValues,
  ) => Promise<void>
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

  const createJob = useCallback(
    async (payload: CreateJobFormValues) => {
      await createJobRequest(payload)
      await loadJobs()
    },
    [loadJobs],
  )

  const updateJobAssignments = useCallback(
    async (jobId: number, payload: UpdateJobAssignmentsValues) => {
      await updateJobAssignmentsRequest(jobId, payload)
      await loadJobs()
    },
    [loadJobs],
  )

  const updateJob = useCallback(
    async (jobId: number, payload: UpdateJobFormValues) => {
      await updateJobRequest(jobId, payload)
      await loadJobs()
    },
    [loadJobs],
  )

  return {
    jobs,
    isLoading,
    errorMessage,
    reload: loadJobs,
    createJob,
    updateJob,
    updateJobAssignments,
  }
}
