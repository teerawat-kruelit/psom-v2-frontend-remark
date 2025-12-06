'use client'

import { AppForm } from '@/components/layout/app-form'
import { AppFormField } from '@/components/layout/app-form-field'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAppAlertDialog } from '@/hooks/use-app-alert-dialog'
import { POST, PUT } from '@/lib/axios'
import { useProductCategoryManagementStore } from '@/store/use-product-category-management-store'
import { useState } from 'react'
import z from 'zod'

const productCategorySchema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อหมวดหมู่สินค้า'),
  remark: z.string().optional(),
})

type ProductCategoryFormValues = z.infer<typeof productCategorySchema>

export function ProductCategoryFormModal() {
  const { modal, setIsOpenFormModal, dataTable, fetchProductCategories } = useProductCategoryManagementStore()
  const [isLoading, setIsLoading] = useState(false)
  const { confirm, AlertDialogComponent } = useAppAlertDialog()
  const record =
    modal.mode === 'view' || modal.mode === 'edit' ? dataTable.find((item) => item.id === modal.targetId) : undefined

  const handleSubmit = (data: ProductCategoryFormValues) => {
    confirm({
      title: 'ยืนยันการบันทึกข้อมูล?',
      description: 'กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนบันทึก',
      onAction: async () => {
        setIsLoading(true)
        try {
          let isError = true
          if (modal.mode === 'create') {
            const response = await POST(`/central/product-category-management/create`, data)
            isError = response.isError
          } else {
            const response = await PUT(`/central/product-category-management/${modal.targetId}/update`, data)
            isError = response.isError
          }
          if (!isError) {
            setIsOpenFormModal(false)
            fetchProductCategories()
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
          {modal.mode === 'create' && (
            <DialogTitle className="text-center text-xl">สร้างข้อมูลหมวดหมู่สินค้า</DialogTitle>
          )}
          {modal.mode === 'edit' && (
            <DialogTitle className="text-center text-xl">แก้ไขข้อมูลหมวดหมู่สินค้า</DialogTitle>
          )}
          {modal.mode === 'view' && <DialogTitle className="text-center text-xl">รายละเอียดหมวดหมู่สินค้า</DialogTitle>}
        </DialogHeader>
        <div className="pt-2">
          <AppForm
            schema={productCategorySchema}
            defaultValues={{
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
                    <AppFormField name="name" label="ชื่อหมวดหมู่สินค้า" required>
                      <Input />
                    </AppFormField>
                    <div className="hidden md:block"></div>
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
