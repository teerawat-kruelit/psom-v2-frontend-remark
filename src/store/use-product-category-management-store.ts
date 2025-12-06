import { create } from 'zustand'
import { ProductCategory, PaginationState } from '@/types'
import { GET } from '@/lib/axios'

interface ProductCategoryState {
  dataTable: ProductCategory[]
  isLoading: boolean
  fetchProductCategories: () => Promise<void>

  search: {
    key: string
    value: string
  }
  setSearch: (key: string, value: string) => void

  sort: {
    column: string
    direction: 'asc' | 'desc'
  }
  setSort: (column: string, direction: 'asc' | 'desc') => void

  pagination: PaginationState
  setPagination: (newPagination: Partial<PaginationState>) => void

  modal: {
    isOpen: boolean
    mode?: 'view' | 'create' | 'edit' | undefined
    targetId?: number
  }
  setIsOpenFormModal: (isOpen: boolean, mode?: 'view' | 'create' | 'edit' | undefined, targetId?: number) => void
}

export const useProductCategoryManagementStore = create<ProductCategoryState>((set, get) => ({
  dataTable: [],
  isLoading: false,
  fetchProductCategories: async () => {
    set({ isLoading: true })

    let search: Record<string, string | number> = {}
    if (get().search.key && get().search.value) {
      search[get().search.key] = get().search.value
    }

    let sort: Record<string, string> = {}
    if (get().sort.column && get().sort.direction) {
      sort['ordering'] = `${get().sort.column},${get().sort.direction}`
    }

    try {
      const response = await GET<ProductCategory>('/central/product-category-management/search', {
        params: {
          pageNo: get().pagination.current,
          pageSize: get().pagination.pageSize,
          ...sort,
          ...search,
        },
      })

      const payload = response.data as { count: number; rows: ProductCategory[] }

      set((state) => ({
        dataTable: payload.rows,
        pagination: {
          ...state.pagination,
          total: payload.count,
        },
      }))
    } catch (error) {
      console.error(error)
    } finally {
      set({ isLoading: false })
    }
  },

  search: {
    key: '',
    value: '',
  },
  setSearch: (key, value) => set({ search: { key, value }, pagination: { ...get().pagination, current: 1 } }),

  sort: {
    column: '',
    direction: 'asc',
  },
  setSort: (column, direction) => {
    if ((get().sort.column === column && direction, get().sort.direction === 'desc')) {
      set({ sort: { column: '', direction: 'asc' } })
    } else {
      set({ sort: { column, direction } })
    }
    get().fetchProductCategories()
  },

  pagination: {
    current: 1,
    pageSize: 20,
    total: 0,
  },
  setPagination: (newPagination: Partial<PaginationState>) => {
    set((state) => ({ pagination: { ...state.pagination, ...newPagination } }))
    get().fetchProductCategories()
  },

  modal: {
    isOpen: false,
    mode: undefined,
    targetId: undefined,
  },
  setIsOpenFormModal: (isOpen, mode, targetId) => {
    if (isOpen) {
      set({ modal: { isOpen, mode, targetId } })
    } else {
      set({ modal: { ...get().modal, isOpen } })
    }
  },
}))
