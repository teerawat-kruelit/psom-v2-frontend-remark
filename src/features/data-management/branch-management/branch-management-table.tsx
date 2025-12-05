'use client'

import { DataTable } from '@/components/layout/data-table'
import { Branch, columns } from './columns'

const data: Branch[] = [
  {
    id: '1',
    code: 'B001B001B001B001B001B001B001B001B001B001B001B001B001',
    name: 'สาขาใหญ่',
    remark: 'สำนักงานใหญ่',
  },
  {
    id: '2',
    code: 'B002',
    name: 'สาขาเชียงใหม่',
    remark: 'ภาคเหนือ',
  },
  {
    id: '3',
    code: 'B003',
    name: 'สาขาภูเก็ต',
    remark: 'ภาคใต้',
  },
]

export function BranchManagementTable() {
  return <DataTable columns={columns} dataSource={data} />
}
