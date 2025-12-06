import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import { toast } from 'sonner'

console.log('API_ENDPOINT:', process.env.NEXT_PUBLIC_API_ENDPOINT)

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  withCredentials: true,
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export interface ApiResponse<T> {
  isError: boolean
  message: string
  data: T | T[] | { count: number; rows: T[] }
}

export const GET = async <T>(url: string, config?: AxiosRequestConfig) => {
  const response = await api.get<ApiResponse<T>>(url, config)
  if (response?.data?.message) {
    if (response.data.isError) {
      toast.error(response.data.message)
    } else {
      toast.success(response.data.message)
    }
  }
  return response.data
}

export const POST = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
  const response = await api.post<ApiResponse<T>>(url, data, config)
  if (response?.data?.message) {
    if (response.data.isError) {
      toast.error(response.data.message)
    } else {
      toast.success(response.data.message)
    }
  }

  return response.data
}

export const PUT = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
  const response = await api.put<ApiResponse<T>>(url, data, config)
  if (response?.data?.message) {
    if (response.data.isError) {
      toast.error(response.data.message)
    } else {
      toast.success(response.data.message)
    }
  }
  return response.data
}

export const DELETE = async <T>(url: string, config?: AxiosRequestConfig) => {
  const response = await api.delete<ApiResponse<T>>(url, config)
  if (response?.data?.message) {
    if (response.data.isError) {
      toast.error(response.data.message)
    } else {
      toast.success(response.data.message)
    }
  }
  return response.data
}

export const GET_MULTI = async <T>(requests: { key: string; url: string; config?: AxiosRequestConfig }[]) => {
  const promises = requests.map((req) => api.get<ApiResponse<T>>(req.url, req.config))
  const responses = await Promise.all(promises)
  let payload: { [key: string]: T | T[] | { count: number; rows: T[] } } = {}
  responses.forEach((res, index) => {
    if (res?.data?.message) {
      if (res.data.isError) {
        toast.error(res.data.message)
      } else {
        toast.success(res.data.message)
      }
    }
    payload[requests[index].key] = res.data.data
  })
  return payload
}

// GET_MASTERS interface
const masters = [
  { key: 'customerBranch', url: '/central/master/customer-branch' },
  { key: 'customer', url: '/central/master/customer' },
  { key: 'customerType', url: '/central/master/customer-type' },
  { key: 'province', url: '/central/master/province' },
  { key: 'productCategory', url: '/central/master/product-category' },
  { key: 'bloodType', url: '/central/master/blood-type' },
  { key: 'nationality', url: '/central/master/nationality' },
  { key: 'religion', url: '/central/master/religion' },
  { key: 'branch', url: '/central/master/branch' },
  { key: 'department', url: '/central/master/department' },
  { key: 'position', url: '/central/master/position' },
  { key: 'role', url: '/central/master/role' },
  { key: 'employee', url: '/central/master/employee' },
  { key: 'product', url: '/central/master/product' },
  { key: 'productForm', url: '/central/master/product-form' },
  { key: 'productFormRows', url: '/central/master/product-form-rows' },
  { key: 'productFormField', url: '/central/master/product-form-fields' },
  { key: 'moduleService', url: '/central/master/module-service' },
  { key: 'gender', url: '/central/master/gender' },
  { key: 'militaryServiceStatus', url: '/central/master/military-service-status' },
  { key: 'marriageStatus', url: '/central/master/marriage-status' },
  { key: 'title', url: '/central/master/title' },
  { key: 'employeeWorkStatus', url: '/central/master/employee-work-status' },
  { key: 'compPackage', url: '/central/master/comp-package' },
  { key: 'productComponentSearch', url: '/central/master/product-component/search' },
  { key: 'requestChangeDataAction', url: '/central/master/request-change-data-action' },
  { key: 'requestChangeDataStatus', url: '/central/master/request-change-data-status' },
  { key: 'requestChangeDataAllowTable', url: '/central/master/request-change-data-allow-table' },
] as const

type MasterKey = (typeof masters)[number]['key']
export const GET_MASTER = async <T>(target: MasterKey | MasterKey[]) => {
  if (Array.isArray(target)) {
    let payload = target
      .map((t): { key: MasterKey; url: string } | undefined => {
        const match = masters.find((m) => m.key === t)
        if (match && match.key && match.url) {
          return { key: match.key, url: match.url }
        }
        return undefined
      })
      .filter((t): t is { key: MasterKey; url: string } => t !== undefined)

    return await GET_MULTI<T>(payload)
  } else {
    const match = masters.find((m) => m.key === target)
    if (!match) return null
    const response = await GET<T>(match.url)
    return response.data || null
  }
}
