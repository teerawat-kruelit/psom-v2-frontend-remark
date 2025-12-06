import { AppForm } from '@/components/layout/app-form'
import { AppFormField } from '@/components/layout/app-form-field'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAppAlertDialog } from '@/hooks/use-app-alert-dialog'
import { GET_MASTER, POST, PUT } from '@/lib/axios'
import { useBranchManagementStore } from '@/store/use-branch-management-store'
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import z from 'zod'

const branchSchema = z.object({
  code: z
    .string()
    .max(5, 'รหัสสาขาต้องไม่เกิน 5 ตัวอักษร')
    .regex(/^[0-9]*$/, 'กรุณากรอกตัวเลขเท่านั้น')
    .optional(),
  name: z.string().min(1, 'กรุณากรอกชื่อสาขา'),
  documentTitleName: z.string().optional(),
  email: z.union([z.string().email('รูปแบบอีเมลไม่ถูกต้อง'), z.literal('')]).optional(),
  taxId: z
    .string()
    .regex(/^[0-9]*$/, 'กรุณากรอกตัวเลขเท่านั้น')
    .optional(),
  tel: z
    .string()
    .regex(/^[0-9]*$/, 'กรุณากรอกตัวเลขเท่านั้น')
    .optional(),
  address: z.string().optional(),
  bankAccount: z.string().optional(),
  remark: z.string().optional(),
})

type BranchFormValues = z.infer<typeof branchSchema>

export function BranchFormModal() {
  const { modal, setIsOpenFormModal, dataTable, fetchBranches } = useBranchManagementStore()
  const [isLoading, setIsLoading] = useState(false)
  const { confirm, AlertDialogComponent } = useAppAlertDialog()
  const record =
    modal.mode === 'view' || modal.mode === 'edit' ? dataTable.find((item) => item.id === modal.targetId) : undefined

  const handleSubmit = (data: BranchFormValues) => {
    confirm({
      title: 'ยืนยันการบันทึกข้อมูล?',
      description: 'กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนบันทึก',
      onAction: async () => {
        setIsLoading(true)
        try {
          let isError = true
          if (modal.mode === 'create') {
            const response = await POST(`/central/branch-management/create`, data)
            isError = response.isError
          } else {
            const response = await PUT(`/central/branch-management/${modal.targetId}/update`, data)
            isError = response.isError
          }
          if (!isError) {
            setIsOpenFormModal(false)
            fetchBranches()
          }
        } finally {
          setIsLoading(false)
        }
      },
    })
  }

  return (
    <Dialog open={modal.isOpen} onOpenChange={(open) => setIsOpenFormModal(open)}>
      <DialogContent className="scrollbar-hidden max-h-[90vh] max-w-[90vw] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          {modal.mode === 'create' && <DialogTitle className="text-center text-2xl">สร้างข้อมูลสาขา</DialogTitle>}
          {modal.mode === 'edit' && <DialogTitle className="text-center text-2xl">แก้ไขข้อมูลสาขา</DialogTitle>}
          {modal.mode === 'view' && <DialogTitle className="text-center text-2xl">รายละเอียดสาขา</DialogTitle>}
        </DialogHeader>
        <div className="py-4">
          <AppForm
            schema={branchSchema}
            defaultValues={{
              code: record?.code || '',
              name: record?.name || '',
              documentTitleName: record?.documentTitleName || '',
              email: record?.email || '',
              taxId: record?.taxId || '',
              tel: record?.tel || '',
              address: record?.address || '',
              bankAccount: record?.bankAccount || '',
              remark: record?.remark || '',
            }}
            onSubmit={handleSubmit}
            readOnly={modal.mode === 'view'}
          >
            {(form) => (
              <>
                <div className="space-y-4">
                  <div className="grid items-start gap-4 md:grid-cols-2">
                    <AppFormField name="code" label="รหัสสาขาPMK">
                      {(field) => (
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9]/g, ''))
                          }}
                        />
                      )}
                    </AppFormField>
                    <AppFormField name="name" label="ชื่อเรียกสาขาPMK" required>
                      <Input />
                    </AppFormField>
                    <AppFormField name="documentTitleName" label="ชื่อสำหรับเอกสาร">
                      <Input />
                    </AppFormField>
                    <AppFormField name="email" label="อีเมล">
                      <Input placeholder="example@email.com" />
                    </AppFormField>
                    <AppFormField name="taxId" label="เลขประจำตัวผู้เสียภาษี">
                      {(field) => (
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9]/g, ''))
                          }}
                        />
                      )}
                    </AppFormField>
                    <AppFormField name="tel" label="เบอร์ติดต่อ">
                      {(field) => (
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9]/g, ''))
                          }}
                        />
                      )}
                    </AppFormField>
                  </div>
                  <AppFormField name="address" label="ที่อยู่">
                    <Textarea className="resize-none" rows={3} />
                  </AppFormField>
                  <AppFormField name="bankAccount" label="ข้อมูลเลขที่บัญชี">
                    <Textarea className="resize-none" rows={3} />
                  </AppFormField>
                  <AppFormField name="remark" label="หมายเหตุ">
                    <Textarea className="resize-none" rows={2} />
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
