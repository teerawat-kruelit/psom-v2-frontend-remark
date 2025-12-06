'use client'

import { useEffect } from 'react'
import { useDepartmentManagementStore } from '@/store/use-department-management-store'
import { Column } from '@/components/layout/data-table'
import { DataTable } from '@/components/layout/data-table'
import { TableActionOption } from '@/components/layout/table-action-option'
import { Department } from '@/types'
import { Settings } from 'lucide-react'
import { DELETE } from '@/lib/axios'

export function DepartmentManagementTable() {
  const { dataTable, isLoading, fetchDepartments, pagination, setPagination, sort, setSort, setIsOpenFormModal } =
    useDepartmentManagementStore()

  const columns: Column<Department>[] = [
    {
      dataIndex: 'code',
      title: 'รหัสแผนก',
      width: 150,
      sorter: true,
    },
    {
      dataIndex: 'name',
      title: 'ชื่อแผนก',
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
                  const response = await DELETE(`/central/department-management/${record.id}/delete`)
                  if (!response.isError) {
                    fetchDepartments()
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
    fetchDepartments()
  }, [fetchDepartments])

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
