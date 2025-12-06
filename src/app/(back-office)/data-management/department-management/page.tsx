'use client'

import { Button } from '@/components/ui/button'
import { DepartmentManagementTable } from '@/features/data-management/department-management/department-management-table'
import { DepartmentFormModal } from '@/features/data-management/department-management/department-form-modal'
import { useDepartmentManagementStore } from '@/store/use-department-management-store'
import { SearchLayout } from '@/components/layout/search-layout'
import { PlusIcon } from 'lucide-react'

export default function DepartmentManagementPage() {
  const { setIsOpenFormModal, search, setSearch, fetchDepartments } = useDepartmentManagementStore()

  const onSearch = (key: string, value: string) => {
    setSearch(key, value)
    fetchDepartments()
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="mb-2 text-2xl font-medium tracking-wide">จัดการข้อมูลแผนก</h1>
      <div className="flex w-full items-center justify-between">
        <SearchLayout
          selectorData={[
            { key: 'code', label: 'รหัสแผนก' },
            { key: 'name', label: 'ชื่อแผนก' },
          ]}
          onSearch={onSearch}
          data={search}
        />
        <Button size="sm" color={'green'} className="px-6" onClick={() => setIsOpenFormModal(true, 'create')}>
          <PlusIcon className="h-4 w-4" />
          <span className="hidden md:inline">สร้างใหม่</span>
        </Button>
      </div>
      <DepartmentManagementTable />
      <DepartmentFormModal />
    </div>
  )
}
