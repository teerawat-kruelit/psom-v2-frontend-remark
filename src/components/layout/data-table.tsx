import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { ArrowUpDown, ArrowUp, ArrowDown, Loader2 } from 'lucide-react'

export interface Column<T> {
  title: React.ReactNode
  dataIndex?: keyof T
  key?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (record: T, value: any, index: number) => React.ReactNode
  width?: string | number
  className?: string
  fixed?: 'left' | 'right'
  align?: 'left' | 'center' | 'right'
  sorter?: boolean
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
  sort?: {
    column: string
    direction: 'asc' | 'desc'
  }
  onSort?: (column: string, direction: 'asc' | 'desc') => void
  verticalBorder?: boolean
  emptyText?: React.ReactNode
}

export function DataTable<T>({
  columns,
  dataSource,
  loading,
  rowKey = 'id' as keyof T,
  className,
  pagination,
  sort,
  onSort,
  verticalBorder = true,
  emptyText = 'No data available',
}: DataTableProps<T>) {
  const [tableHeight, setTableHeight] = React.useState<number>(500)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const calculateHeight = () => {
      if (wrapperRef.current) {
        const top = wrapperRef.current.getBoundingClientRect().top
        const paginationHeight = pagination ? 30 : 0
        const newHeight = window.innerHeight - top - paginationHeight - 40
        setTableHeight(Math.max(newHeight, 300))
      }
    }

    calculateHeight()
    window.addEventListener('resize', calculateHeight)
    return () => window.removeEventListener('resize', calculateHeight)
  }, [pagination])

  // Remove loading check

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

  const handleSort = (columnKey: string) => {
    if (!onSort) return

    let newDirection: 'asc' | 'desc' = 'asc'
    if (sort?.column === columnKey && sort.direction === 'asc') {
      newDirection = 'desc'
    }
    onSort(columnKey, newDirection)
  }

  return (
    <div ref={wrapperRef} className={cn('relative w-full', className)}>
      <Table
        containerClassName="overflow-auto scrollbar-custom-table rounded-sm border"
        containerStyle={{ maxHeight: tableHeight }}
      >
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
                    'bg-gray-300',
                    col.className,
                    col.align && `text-${col.align}`,
                    verticalBorder && 'border-r last:border-r-0',
                    'sticky top-0 z-30',
                    (isStickyLeft || isStickyRight) && 'z-40',
                    isStickyRight && 'border-l shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.1)]',
                    isStickyLeft && 'border-r shadow-[5px_0_10px_-5px_rgba(0,0,0,0.1)]',
                    col.sorter && 'cursor-pointer transition-colors hover:bg-gray-400/60'
                  )}
                  style={style}
                  onClick={() => {
                    if (col.sorter && (col.dataIndex || col.key)) {
                      handleSort((col.dataIndex as string) || col.key!)
                    }
                  }}
                >
                  <div
                    className={cn(
                      'flex items-center gap-2',
                      col.align === 'center' && 'justify-center',
                      col.align === 'right' && 'justify-end'
                    )}
                  >
                    {col.title}
                    {col.sorter && (
                      <span className="text-gray-500">
                        {sort?.column === (col.dataIndex || col.key) ? (
                          sort?.direction === 'asc' ? (
                            <ArrowUp size={14} />
                          ) : (
                            <ArrowDown size={14} />
                          )
                        ) : (
                          <ArrowUpDown size={14} />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {(dataSource || []).length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            dataSource.map((record, index) => {
              const key = typeof rowKey === 'function' ? rowKey(record) : (record[rowKey] as React.Key)
              return (
                <TableRow key={key} className="bg-white">
                  {columns.map((col, colIndex) => {
                    const value = col.dataIndex ? record[col.dataIndex] : undefined
                    const colKey = col.key || (col.dataIndex as string) || colIndex.toString()
                    const isStickyLeft = col.fixed === 'left'
                    const isStickyRight = col.fixed === 'right'
                    const style: React.CSSProperties = {
                      width: col.width,
                      minWidth: col.width,
                      left: isStickyLeft ? stickyLeftOffsets[colIndex] : undefined,
                      right: isStickyRight ? stickyRightOffsets[colIndex] : undefined,
                    }

                    return (
                      <TableCell
                        key={colKey}
                        className={cn(
                          col.className,
                          col.align && `text-${col.align}`,
                          col.width ? 'break-all whitespace-normal' : '',
                          verticalBorder && 'border-r last:border-r-0',
                          (isStickyLeft || isStickyRight) && 'sticky z-10 bg-white',
                          isStickyRight && 'border-l shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.1)]',
                          isStickyLeft && 'border-r shadow-[5px_0_10px_-5px_rgba(0,0,0,0.1)]'
                        )}
                        style={style}
                      >
                        {col.render ? col.render(record, value, index) : (value as React.ReactNode)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
      {pagination && (
        <div className="mt-1 flex items-center justify-end gap-1 py-1">
          <div className="text-sm">
            {pagination.current * pagination.pageSize - pagination.pageSize + 1} -{' '}
            {Math.min(pagination.current * pagination.pageSize, pagination.total)} จาก {pagination.total} รายการ
          </div>
          <div className="w-fit">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    size={'sm'}
                    onClick={() => {
                      if (pagination.current > 1) {
                        pagination.onChange(pagination.current - 1, pagination.pageSize)
                      }
                    }}
                    className={pagination.current <= 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="text-sm font-medium">
                    {pagination.current} / {Math.ceil(pagination.total / pagination.pageSize)}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    size={'sm'}
                    onClick={() => {
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
          <div className="flex items-center">
            <Select
              value={pagination.pageSize.toString()}
              onValueChange={(value) => {
                pagination.onChange(1, Number(value))
              }}
            >
              <SelectTrigger className="w-fit" size="sm">
                <SelectValue placeholder={pagination.pageSize.toString()} />
              </SelectTrigger>
              <SelectContent side="top">
                {[20, 50, 100, 200].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <Loader2 className="text-primary animate-spin" size={42} />
        </div>
      )}
    </div>
  )
}
