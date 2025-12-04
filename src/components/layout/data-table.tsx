import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export interface Column<T> {
  title: React.ReactNode
  dataIndex?: keyof T
  key?: string
  render?: (value: any, record: T, index: number) => React.ReactNode
  width?: string | number
  className?: string
  fixed?: 'left' | 'right'
  align?: 'left' | 'center' | 'right'
}

interface DataTableProps<T> {
  columns: Column<T>[]
  dataSource: T[]
  loading?: boolean
  rowKey?: keyof T | ((record: T) => string | number)
  className?: string
  pagination?: {
    current: number
    pageSize: number
    total: number
    onChange: (page: number, pageSize: number) => void
  }
}

export function DataTable<T>({ columns, dataSource, loading, rowKey = 'id' as keyof T, className, pagination }: DataTableProps<T>) {
  if (loading) {
    return <div className="p-8 text-center">Loading data...</div>
  }

  // Calculate sticky offsets
  const stickyLeftOffsets: number[] = []
  const stickyRightOffsets: number[] = []
  let currentLeft = 0
  let currentRight = 0

  columns.forEach((col) => {
    if (col.fixed === 'left') {
      stickyLeftOffsets.push(currentLeft)
      currentLeft += Number(col.width) || 0
    } else {
      stickyLeftOffsets.push(0)
    }
  })

  for (let i = columns.length - 1; i >= 0; i--) {
    const col = columns[i]
    if (col.fixed === 'right') {
      stickyRightOffsets[i] = currentRight
      currentRight += Number(col.width) || 0
    } else {
      stickyRightOffsets[i] = 0
    }
  }

  return (
    <div className={cn('relative w-full overflow-x-auto rounded-md border', className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => {
              const colKey = col.key || (col.dataIndex as string) || index.toString()
              const isStickyLeft = col.fixed === 'left'
              const isStickyRight = col.fixed === 'right'
              const style: React.CSSProperties = {
                width: col.width,
                minWidth: col.width,
                left: isStickyLeft ? stickyLeftOffsets[index] : undefined,
                right: isStickyRight ? stickyRightOffsets[index] : undefined,
              }

              return (
                <TableHead
                  key={colKey}
                  className={cn(
                    col.className,
                    col.align && `text-${col.align}`,
                    (isStickyLeft || isStickyRight) && 'bg-background sticky z-20',
                    isStickyRight && 'border-l shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.1)]',
                    isStickyLeft && 'border-r shadow-[5px_0_10px_-5px_rgba(0,0,0,0.1)]'
                  )}
                  style={style}
                >
                  {col.title}
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataSource.map((record, index) => {
            const key = typeof rowKey === 'function' ? rowKey(record) : (record[rowKey] as React.Key)
            return (
              <TableRow key={key}>
                {columns.map((col, colIndex) => {
                  const value = col.dataIndex ? record[col.dataIndex] : undefined
                  const colKey = col.key || (col.dataIndex as string) || colIndex.toString()
                  const isStickyLeft = col.fixed === 'left'
                  const isStickyRight = col.fixed === 'right'
                  const style: React.CSSProperties = {
                    left: isStickyLeft ? stickyLeftOffsets[colIndex] : undefined,
                    right: isStickyRight ? stickyRightOffsets[colIndex] : undefined,
                  }

                  return (
                    <TableCell
                      key={colKey}
                      className={cn(
                        col.className,
                        col.align && `text-${col.align}`,
                        (isStickyLeft || isStickyRight) && 'bg-background sticky z-10',
                        isStickyRight && 'border-l shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.1)]',
                        isStickyLeft && 'border-r shadow-[5px_0_10px_-5px_rgba(0,0,0,0.1)]'
                      )}
                      style={style}
                    >
                      {col.render ? col.render(value, record, index) : (value as React.ReactNode)}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {pagination && (
        <div className="flex items-center justify-end py-4">
          <div className="w-fit">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (pagination.current > 1) {
                        pagination.onChange(pagination.current - 1, pagination.pageSize)
                      }
                    }}
                    className={pagination.current <= 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                {Array.from({ length: Math.ceil(pagination.total / pagination.pageSize) }, (_, i) => i + 1).map((page) => {
                  // Simple pagination logic: show all pages for now, can be optimized for large numbers later
                  if (
                    Math.ceil(pagination.total / pagination.pageSize) > 7 &&
                    page > 1 &&
                    page < Math.ceil(pagination.total / pagination.pageSize) &&
                    Math.abs(page - pagination.current) > 1
                  ) {
                    if (Math.abs(page - pagination.current) === 2) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )
                    }
                    return null
                  }

                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === pagination.current}
                        onClick={(e) => {
                          e.preventDefault()
                          pagination.onChange(page, pagination.pageSize)
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (pagination.current < Math.ceil(pagination.total / pagination.pageSize)) {
                        pagination.onChange(pagination.current + 1, pagination.pageSize)
                      }
                    }}
                    className={
                      pagination.current >= Math.ceil(pagination.total / pagination.pageSize)
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  )
}
