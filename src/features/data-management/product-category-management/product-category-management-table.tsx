'use client'

import { useEffect } from 'react'
import { useProductCategoryManagementStore } from '@/store/use-product-category-management-store'
import { Column } from '@/components/layout/data-table'
import { DataTable } from '@/components/layout/data-table'
import { TableActionOption } from '@/components/layout/table-action-option'
import { ProductCategory } from '@/types'
import { Settings } from 'lucide-react'
import { DELETE } from '@/lib/axios'

export function ProductCategoryManagementTable() {
  const { dataTable, isLoading, fetchProductCategories, pagination, setPagination, sort, setSort, setIsOpenFormModal } =
    useProductCategoryManagementStore()

  const columns: Column<ProductCategory>[] = [
    {
      dataIndex: 'name',
      title: 'ชื่อหมวดหมู่สินค้า',
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
                  const response = await DELETE(`/central/product-category-management/${record.id}/delete`)
                  if (!response.isError) {
                    fetchProductCategories()
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
    fetchProductCategories()
  }, [fetchProductCategories])

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
