'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { DataTable, Column } from '@/components/layout/data-table'

import { useAppStore } from '@/store/use-app-store'
import { User } from '@/types'

export function FetchTableDemo() {
  const { users, isUsersLoading, fetchUsers } = useAppStore()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const paginatedUsers = users.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const columns: Column<User>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
      className: 'font-medium',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: 150,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      width: 150,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      width: 200,
      render: (_, record) => record.company.name,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      fixed: 'right',
      width: 200,
      render: (_, record) => `${record.address.street}, ${record.address.city}`,
    },
    {
      title: 'Action',
      width: 100,
      fixed: 'right',
      align: 'center',
      render: (_, record) => (
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600"
          onClick={() => toast.success(`Selected ${record.name}`)}
        >
          Edit
        </Button>
      ),
    },
  ]

  return (
    <div className="w-full max-w-4xl space-y-4 rounded-lg border p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">User Database</h2>
        <Button variant="outline" size="sm" onClick={() => toast.info('Refetching not implemented in demo')}>
          Refresh
        </Button>
      </div>
      <DataTable
        columns={columns}
        dataSource={paginatedUsers}
        loading={isUsersLoading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: users.length,
          onChange: (page, size) => {
            setCurrentPage(page)
            setPageSize(size)
          },
        }}
      />
    </div>
  )
}
