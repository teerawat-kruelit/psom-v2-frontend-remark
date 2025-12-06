'use client'

import { useEffect } from 'react'
import { useBranchManagementStore } from '@/store/use-branch-management-store'
import { Column } from '@/components/layout/data-table'
import { DataTable } from '@/components/layout/data-table'
import { TableActionOption } from '@/components/layout/table-action-option'
import { Branch } from '@/types'
import { Settings } from 'lucide-react'
import { DELETE } from '@/lib/axios'

export function BranchManagementTable() {
  const { dataTable, isLoading, fetchBranches, pagination, setPagination, sort, setSort, setIsOpenFormModal } =
    useBranchManagementStore()

  const columns: Column<Branch>[] = [
    {
      dataIndex: 'code',
      title: 'รหัสสาขา PMK',
      width: 150,
      sorter: true,
    },
    {
      dataIndex: 'name',
      title: 'ชื่อเรียกสาขา PMK',
      width: 300,
      sorter: true,
    },
    {
      dataIndex: 'remark',
      title: 'หมายเหตุ',
    },
    {
      key: 'actions',
      title: <Settings className="mx-auto" size={20} />,
      align: 'center',
      width: 50,
      render: (record) => {
        return (
          <TableActionOption
            options={[
              {
                type: 'view',
                onClick: () => setIsOpenFormModal(true, 'view', record.id),
              },
              { type: 'edit', onClick: () => setIsOpenFormModal(true, 'edit', record.id) },
              {
                type: 'delete',
                onClick: async () => {
                  const response = await DELETE(`/central/branch-management/${record.id}/delete`)
                  if (!response.isError) {
                    fetchBranches()
                  }
                },
              },
            ]}
          />
        )
      },
    },
  ]

  useEffect(() => {
    fetchBranches()
  }, [fetchBranches])

  return (
    <DataTable
      columns={columns}
      dataSource={dataTable}
      loading={isLoading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        onChange: (page, size) => {
          setPagination({ current: page, pageSize: size })
        },
      }}
      sort={sort}
      onSort={setSort}
    />
  )
}
