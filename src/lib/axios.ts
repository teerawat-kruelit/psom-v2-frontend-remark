import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import { toast } from 'sonner'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com',
  withCredentials: true,
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export interface ApiResponse<T> {
  isError: boolean
  message: string
  data: T
}

export const GET = async <T>(url: string, config?: AxiosRequestConfig) => {
  const response = await api.get<ApiResponse<T>>(url, config)
  if (response.data.isError) {
    toast.error(response.data.message)
    throw new Error(response.data.message)
  }
  return response.data.data
}

export const POST = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
  const response = await api.post<ApiResponse<T>>(url, data, config)
  if (response.data.isError) {
    toast.error(response.data.message)
    throw new Error(response.data.message)
  }
  toast.success(response.data.message)
  return response.data.data
}

export const PUT = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
  const response = await api.put<ApiResponse<T>>(url, data, config)
  if (response.data.isError) {
    toast.error(response.data.message)
    throw new Error(response.data.message)
  }
  toast.success(response.data.message)
  return response.data.data
}

export const DELETE = async <T>(url: string, config?: AxiosRequestConfig) => {
  const response = await api.delete<ApiResponse<T>>(url, config)
  if (response.data.isError) {
    toast.error(response.data.message)
    throw new Error(response.data.message)
  }
  toast.success(response.data.message)
  return response.data.data
}

export const GET_MULTI = async <T>(requests: { key: string; url: string; config?: AxiosRequestConfig }[]) => {
  const promises = requests.map((req) => api.get<ApiResponse<T>>(req.url, req.config))
  const responses = await Promise.all(promises)
  return responses.map((res, index) => {
    if (res.data.isError) {
      toast.error(res.data.message)
      throw new Error(res.data.message)
    }
    return {
      key: requests[index].key,
      data: res.data.data,
    }
  })
}
