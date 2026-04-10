export type CustomerSummary = {
  id: number
  name: string
}

export type WorkerSummary = {
  id: number
  employee_code: string
  name: string
}

export type CustomerCreateFormValues = {
  name: string
  contactPerson: string
  phone: string
  email: string
}

export type WorkerCreateFormValues = {
  employeeCode: string
  name: string
  isActive: boolean
}
