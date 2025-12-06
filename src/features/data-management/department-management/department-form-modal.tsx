import { AppForm } from '@/components/layout/app-form'
import { AppFormField } from '@/components/layout/app-form-field'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAppAlertDialog } from '@/hooks/use-app-alert-dialog'
import { POST, PUT } from '@/lib/axios'
import { useDepartmentManagementStore } from '@/store/use-department-management-store'
import { useState } from 'react'
import z from 'zod'

const departmentSchema = z.object({
  code: z.string().max(5, 'รหัสแผนกต้องไม่เกิน 5 ตัวอักษร').optional(),
  name: z.string().min(1, 'กรุณากรอกชื่อแผนก'),
  remark: z.string().optional(),
})

type DepartmentFormValues = z.infer<typeof departmentSchema>

export function DepartmentFormModal() {
  const { modal, setIsOpenFormModal, dataTable, fetchDepartments } = useDepartmentManagementStore()
  const [isLoading, setIsLoading] = useState(false)
  const { confirm, AlertDialogComponent } = useAppAlertDialog()
  const record =
    modal.mode === 'view' || modal.mode === 'edit' ? dataTable.find((item) => item.id === modal.targetId) : undefined

  const handleSubmit = (data: DepartmentFormValues) => {
    confirm({
      title: 'ยืนยันการบันทึกข้อมูล?',
      description: 'กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนบันทึก',
      onAction: async () => {
        setIsLoading(true)
        try {
          let isError = true
          if (modal.mode === 'create') {
            const response = await POST(`/central/department-management/create`, data)
            isError = response.isError
          } else {
            const response = await PUT(`/central/department-management/${modal.targetId}/update`, data)
            isError = response.isError
          }
          if (!isError) {
            setIsOpenFormModal(false)
            fetchDepartments()
          }
        } finally {
          setIsLoading(false)
        }
      },
    })
  }

  return (
    <Dialog open={modal.isOpen} onOpenChange={(open) => setIsOpenFormModal(open)}>
      <DialogContent className="scrollbar-hidden max-h-[90vh] max-w-[90vw] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          {modal.mode === 'create' && <DialogTitle className="text-center text-2xl">สร้างข้อมูลแผนก</DialogTitle>}
          {modal.mode === 'edit' && <DialogTitle className="text-center text-2xl">แก้ไขข้อมูลแผนก</DialogTitle>}
          {modal.mode === 'view' && <DialogTitle className="text-center text-2xl">รายละเอียดแผนก</DialogTitle>}
        </DialogHeader>
        <div className="py-4">
          <AppForm
            schema={departmentSchema}
            defaultValues={{
              code: record?.code || '',
              name: record?.name || '',
              remark: record?.remark || '',
            }}
            onSubmit={handleSubmit}
            readOnly={modal.mode === 'view'}
          >
            {(form) => (
              <>
                <div className="space-y-4">
                  <div className="grid items-start gap-4 md:grid-cols-2">
                    <AppFormField name="code" label="รหัสแผนก">
                      <Input />
                    </AppFormField>
                    <AppFormField name="name" label="ชื่อแผนก" required>
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
                      variant="outline"
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
