import { MoreHorizontal, Pencil, Trash, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAppAlertDialog } from '@/hooks/use-app-alert-dialog'

export interface ActionOption {
  type: 'view' | 'edit' | 'delete'
  onClick: () => void
  label?: string
}

interface TableActionOptionProps {
  options: ActionOption[]
}

export function TableActionOption({ options }: TableActionOptionProps) {
  const typeData: Record<
    'view' | 'edit' | 'delete',
    { label: string; variant: 'default' | 'destructive'; icon: React.ReactNode }
  > = {
    view: { label: 'เรียกดู', variant: 'default', icon: <Eye className="mr-2 h-4 w-4" /> },
    edit: { label: 'แก้ไข', variant: 'default', icon: <Pencil className="mr-2 h-4 w-4" /> },
    delete: { label: 'ลบ', variant: 'destructive', icon: <Trash className="mr-2 h-4 w-4" /> },
  }

  const { confirm, AlertDialogComponent } = useAppAlertDialog()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-6 w-6 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option, index) => {
          const isDelete = option.type === 'delete'
          const showSeparator = isDelete && index > 0 && options[index - 1].type !== 'delete'

          return (
            <div key={index}>
              {showSeparator && <DropdownMenuSeparator />}
              <DropdownMenuItem
                variant={typeData[option.type].variant}
                onClick={() => {
                  if (option.type === 'delete') {
                    confirm({
                      title: 'ยืนยันการลบ',
                      description: 'คุณต้องการลบข้อมูลนี้ใช่หรือไม่',
                      onAction: () => option.onClick(),
                    })
                  } else {
                    option.onClick()
                  }
                }}
                className="cursor-pointer"
              >
                {typeData[option.type].icon}
                {option.label || typeData[option.type].label}
              </DropdownMenuItem>
            </div>
          )
        })}
      </DropdownMenuContent>
      {AlertDialogComponent}
    </DropdownMenu>
  )
}
