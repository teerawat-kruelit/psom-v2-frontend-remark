'use client'

import { Button } from '@/components/ui/button'
import { BranchManagementTable } from '@/features/data-management/branch-management/branch-management-table'
import { BranchFormModal } from '@/features/data-management/branch-management/branch-form-modal'
import { useBranchManagementStore } from '@/store/use-branch-management-store'
import { SearchLayout } from '@/components/layout/search-layout'
import { PlusIcon } from 'lucide-react'

export default function BranchManagementPage() {
  const { setIsOpenFormModal, search, setSearch, fetchBranches } = useBranchManagementStore()

  const onSearch = (key: string, value: string) => {
    setSearch(key, value)
    fetchBranches()
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="mb-2 text-2xl font-medium tracking-wide">จัดการข้อมูลสาขา</h1>
      <div className="flex w-full items-center justify-between">
        <SearchLayout
          selectorData={[
            { key: 'code', label: 'รหัสสาขาPMK' },
            { key: 'name', label: 'ชื่อเรียกสาขาPMK' },
          ]}
          onSearch={onSearch}
          data={search}
        />
        <Button size="sm" color={'green'} className="px-6" onClick={() => setIsOpenFormModal(true, 'create')}>
          <PlusIcon className="h-4 w-4" />
          <span className="hidden md:inline">สร้างใหม่</span>
        </Button>
      </div>
      <BranchManagementTable />
      <BranchFormModal />
    </div>
  )
}
