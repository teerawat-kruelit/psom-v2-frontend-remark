'use client'

import { Column } from '@/components/layout/data-table'
import { MoreHorizontal, Pencil, Trash, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type Branch = {
  id: string
  code: string
  name: string
  remark: string
}

export const columns: Column<Branch>[] = [
  {
    dataIndex: 'code',
    title: 'รหัสสาขาPMK',
    width: 150,
  },
  {
    dataIndex: 'name',
    title: 'ชื่อเรียกสาขาPMK',
    width: 200,
  },
  {
    dataIndex: 'remark',
    title: 'หมายเหตุ',
  },
  {
    key: 'actions',
    title: 'จัดการ',
    render: (_, record) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => console.log('View', record.id)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Edit', record.id)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={() => console.log('Delete', record.id)}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
