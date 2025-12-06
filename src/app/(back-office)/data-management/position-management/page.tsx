'use client'

import { Button } from '@/components/ui/button'
import { PositionManagementTable } from '@/features/data-management/position-management/position-management-table'
import { PositionFormModal } from '@/features/data-management/position-management/position-form-modal'
import { usePositionManagementStore } from '@/store/use-position-management-store'
import { SearchLayout } from '@/components/layout/search-layout'
import { PlusIcon } from 'lucide-react'

export default function PositionManagementPage() {
  const { setIsOpenFormModal, search, setSearch, fetchPositions } = usePositionManagementStore()

  const onSearch = (key: string, value: string) => {
    setSearch(key, value)
    fetchPositions()
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="mb-2 text-2xl font-medium tracking-wide">จัดการข้อมูลตำแหน่ง</h1>
      <div className="flex w-full items-center justify-between">
        <SearchLayout
          selectorData={[
            { key: 'code', label: 'รหัสตำแหน่ง' },
            { key: 'name', label: 'ชื่อตำแหน่ง' },
          ]}
          onSearch={onSearch}
          data={search}
        />
        <Button size="sm" color={'green'} className="px-6" onClick={() => setIsOpenFormModal(true, 'create')}>
          <PlusIcon className="h-4 w-4" />
          <span className="hidden md:inline">สร้างใหม่</span>
        </Button>
      </div>
      <PositionManagementTable />
      <PositionFormModal />
    </div>
  )
}
