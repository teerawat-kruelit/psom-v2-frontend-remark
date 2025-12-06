'use client'

import { Button } from '@/components/ui/button'
import { ProductCategoryManagementTable } from '@/features/data-management/product-category-management/product-category-management-table'
import { ProductCategoryFormModal } from '@/features/data-management/product-category-management/product-category-form-modal'
import { useProductCategoryManagementStore } from '@/store/use-product-category-management-store'
import { SearchLayout } from '@/components/layout/search-layout'
import { PlusIcon } from 'lucide-react'

export default function ProductCategoryManagementPage() {
  const { setIsOpenFormModal, search, setSearch, fetchProductCategories } = useProductCategoryManagementStore()

  const onSearch = (key: string, value: string) => {
    setSearch(key, value)
    fetchProductCategories()
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="mb-2 text-2xl font-medium tracking-wide">จัดการข้อมูลหมวดหมู่สินค้า</h1>
      <div className="flex w-full items-center justify-between">
        <SearchLayout selectorData={[{ key: 'name', label: 'ชื่อหมวดหมู่สินค้า' }]} onSearch={onSearch} data={search} />
        <Button size="sm" color={'green'} className="px-6" onClick={() => setIsOpenFormModal(true, 'create')}>
          <PlusIcon className="h-4 w-4" />
          <span className="hidden md:inline">สร้างใหม่</span>
        </Button>
      </div>
      <ProductCategoryManagementTable />
      <ProductCategoryFormModal />
    </div>
  )
}
