export interface AuthUser {
  username: string
  name: string
}

export interface PaginationState {
  current: number
  pageSize: number
  total: number
}

export interface Branch {
  id: number
  code: string | null
  name: string
  documentTitleName: string | null
  bankAccount: string | null
  taxId: string | null
  email: string | null
  tel: string | null
  fax: string | null
  address: string | null
  remark: string | null
}

export interface Department {
  id: number
  code: string | null
  name: string
  remark: string | null
}
