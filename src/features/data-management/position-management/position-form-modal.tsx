import { AppForm } from '@/components/layout/app-form'
import { AppFormCombobox } from '@/components/layout/app-form-combobox'
import { AppFormField } from '@/components/layout/app-form-field'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAppAlertDialog } from '@/hooks/use-app-alert-dialog'
import { GET_MASTER, POST, PUT } from '@/lib/axios'
import { usePositionManagementStore } from '@/store/use-position-management-store'
import { useEffect, useState } from 'react'
import z from 'zod'

const positionSchema = z.object({
  code: z.string().optional(),
  name: z.string().min(1, 'กรุณากรอกชื่อตำแหน่ง'),
  departmentId: z.coerce.number().optional(),
  remark: z.string().optional(),
})

type PositionFormValues = z.infer<typeof positionSchema>

export function PositionFormModal() {
  const { modal, setIsOpenFormModal, dataTable, fetchPositions } = usePositionManagementStore()
  const [isLoading, setIsLoading] = useState(false)
  const [departments, setDepartments] = useState<any[]>([])
  const { confirm, AlertDialogComponent } = useAppAlertDialog()
  const record =
    modal.mode === 'view' || modal.mode === 'edit' ? dataTable.find((item) => item.id === modal.targetId) : undefined

  useEffect(() => {
    const init = async () => {
      if (modal.isOpen) {
        const response = await GET_MASTER('department')
        if (Array.isArray(response)) {
          setDepartments(response)
        }
      }
    }
    init()
  }, [modal.isOpen])

  const handleSubmit = (data: PositionFormValues) => {
    const payload = {
      ...data,
      departmentId: data.departmentId ? Number(data.departmentId) : null,
    }
    confirm({
      title: 'ยืนยันการบันทึกข้อมูล?',
      description: 'กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนบันทึก',
      onAction: async () => {
        setIsLoading(true)
        try {
          let isError = true
          if (modal.mode === 'create') {
            const response = await POST(`/central/position-management/create`, payload)
            isError = response.isError
          } else {
            const response = await PUT(`/central/position-management/${modal.targetId}/update`, payload)
            isError = response.isError
          }
          if (!isError) {
            setIsOpenFormModal(false)
            fetchPositions()
          }
        } finally {
          setIsLoading(false)
        }
      },
    })
  }

  const departmentOptions = departments.map((d) => ({
    label: d.name,
    value: d.id.toString(),
  }))

  return (
    <Dialog open={modal.isOpen} onOpenChange={(open) => setIsOpenFormModal(open)}>
      <DialogContent className="scrollbar-hidden max-h-[90vh] max-w-[90vw] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          {modal.mode === 'create' && <DialogTitle className="text-center text-xl">สร้างข้อมูลตำแหน่ง</DialogTitle>}
          {modal.mode === 'edit' && <DialogTitle className="text-center text-xl">แก้ไขข้อมูลตำแหน่ง</DialogTitle>}
          {modal.mode === 'view' && <DialogTitle className="text-center text-xl">รายละเอียดตำแหน่ง</DialogTitle>}
        </DialogHeader>
        <div className="pt-2">
          <AppForm
            schema={positionSchema}
            defaultValues={{
              code: record?.code || '',
              name: record?.name || '',
              departmentId: record?.departmentId ? Number(record.departmentId) : undefined,
              remark: record?.remark || '',
            }}
            onSubmit={handleSubmit}
            readOnly={modal.mode === 'view'}
          >
            {(form) => (
              <>
                <div className="space-y-4">
                  <div className="grid items-start gap-4 md:grid-cols-2">
                    <AppFormCombobox name="departmentId" label="สังกัดแผนก" options={departmentOptions} />
                    <div className="hidden md:block"></div>
                    <AppFormField name="code" label="รหัสตำแหน่ง">
                      <Input />
                    </AppFormField>
                    <AppFormField name="name" label="ชื่อตำแหน่ง" required>
                      <Input />
                    </AppFormField>
                  </div>
                  <AppFormField name="remark" label="หมายเหตุ">
                    <Textarea className="resize-none" rows={3} />
                  </AppFormField>
                  <div className="flex justify-center gap-2">
                    {(modal.mode === 'create' || modal.mode === 'edit') && (
                      <Button className="w-24" color={'green'} type="submit" loading={isLoading}>
                        บันทึก
                      </Button>
                    )}
                    <Button
                      className="w-24"
                      variant="cancel"
                      type="button"
                      disabled={isLoading}
                      onClick={() => setIsOpenFormModal(false)}
                    >
                      {modal.mode === 'view' ? 'ปิด' : 'ยกเลิก'}
                    </Button>
                  </div>
                </div>
                {AlertDialogComponent}
              </>
            )}
          </AppForm>
        </div>
      </DialogContent>
    </Dialog>
  )
}
