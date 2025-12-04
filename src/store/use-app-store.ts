import { create } from 'zustand'
import { User, Employee, AuthUser } from '@/types'
import { LoginFormValues } from '@/features/auth/components/login-form'
import { api } from '@/lib/axios'

interface AppState {
  // Counter Slice
  count: number
  increment: () => void
  decrement: () => void

  // User Slice
  users: User[]
  isUsersLoading: boolean
  fetchUsers: () => Promise<void>

  // Employee Slice
  employees: Employee[]
  addEmployee: (employee: Employee) => void

  // Auth Slice
  user: AuthUser | null
  isAuthenticated: boolean
  isAuthLoading: boolean
  login: (data: LoginFormValues) => Promise<void>
  logout: () => void
}

export const useAppStore = create<AppState>((set) => ({
  // Counter Slice
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),

  // User Slice
  users: [],
  isUsersLoading: false,
  fetchUsers: async () => {
    set({ isUsersLoading: true })
    try {
      const response = await api.get<User[]>('/users')
      set({ users: response.data })
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      set({ isUsersLoading: false })
    }
  },

  // Employee Slice
  employees: [],
  addEmployee: (employee) => set((state) => ({ employees: [...state.employees, employee] })),

  // Auth Slice
  user: null,
  isAuthenticated: false,
  isAuthLoading: false,
  login: async (data) => {
    set({ isAuthLoading: true })
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const mockUser: AuthUser = {
        username: data.username,
        name: 'Mock User',
        token: 'mock-token',
      }
      set({ user: mockUser, isAuthenticated: true })
    } finally {
      set({ isAuthLoading: false })
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}))
