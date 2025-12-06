'use client'

import { useEffect } from 'react'
import { usePositionManagementStore } from '@/store/use-position-management-store'
import { Column } from '@/components/layout/data-table'
import { DataTable } from '@/components/layout/data-table'
import { TableActionOption } from '@/components/layout/table-action-option'
import { Position } from '@/types'
import { Settings } from 'lucide-react'
import { DELETE } from '@/lib/axios'

export function PositionManagementTable() {
  const { dataTable, isLoading, fetchPositions, pagination, setPagination, sort, setSort, setIsOpenFormModal } =
    usePositionManagementStore()

  const columns: Column<Position>[] = [
    {
      dataIndex: 'departmentName',
      title: 'แผนก',
      width: 250,
      sorter: true,
    },
    {
      dataIndex: 'code',
      title: 'รหัสตำแหน่ง',
      width: 150,
      sorter: true,
    },
    {
      dataIndex: 'name',
      title: 'ชื่อตำแหน่ง',
      width: 250,
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
                  const response = await DELETE(`/central/position-management/${record.id}/delete`)
                  if (!response.isError) {
                    fetchPositions()
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
    fetchPositions()
  }, [fetchPositions])

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
