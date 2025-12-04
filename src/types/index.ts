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
