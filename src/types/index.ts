export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
  }
  address: {
    street: string
    city: string
  }
}

export interface Employee {
  id?: string
  status: string
  startDate: Date
  endDate?: Date
  remark?: string
  displayNameLang: 'TH' | 'EN'
  nickname: string
  firstNameTH: string
  lastNameTH: string
  firstNameEN?: string
  lastNameEN?: string
  weight: number
  height: number
  phoneNumber: string
  branch: string
  department: string
  role: string
  position: string
}

export interface AuthUser {
  username: string
  name: string
  token: string
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
