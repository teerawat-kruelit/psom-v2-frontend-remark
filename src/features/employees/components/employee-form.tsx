'use client'

import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AppForm } from '@/components/layout/app-form'
import { AppFormField } from '@/components/layout/app-form-field'
import { AppFormCombobox } from '@/components/layout/app-form-combobox'
import { DatePicker } from '@/components/layout/date-picker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppAlertDialog } from '@/hooks/use-app-alert-dialog'
import { useAppStore } from '@/store/use-app-store'

const employeeSchema = z.object({
    // Work Status
    status: z.string().min(1, 'กรุณาเลือกสถานะ'),
    startDate: z.date(),
    endDate: z.date().optional(),
    remark: z.string().optional(),

    // Personal Info
    displayNameLang: z.enum(['TH', 'EN']),
    nickname: z.string().min(1, 'กรุณากรอกชื่อเล่น'),
    firstNameTH: z.string().min(1, 'กรุณากรอกชื่อ (TH)'),
    lastNameTH: z.string().min(1, 'กรุณากรอกนามสกุล (TH)'),
    firstNameEN: z.string().optional(),
    lastNameEN: z.string().optional(),
    weight: z.coerce.number().min(0, 'น้ำหนักต้องมากกว่า 0'),
    height: z.coerce.number().min(0, 'ส่วนสูงต้องมากกว่า 0'),
    phoneNumber: z
        .string()
        .regex(/^\d+$/, 'กรุณากรอกเฉพาะตัวเลข')
        .min(9, 'เบอร์โทรศัพท์ต้องมีอย่างน้อย 9 หลัก'),

    // Department & Position
    branch: z.string().min(1, 'กรุณาเลือกสาขา'),
    department: z.string().min(1, 'กรุณาเลือกแผนก'),
    role: z.string().min(1, 'กรุณาเลือกบทบาท'),
    position: z.string().min(1, 'กรุณาเลือกตำแหน่ง'),
})

type EmployeeFormValues = z.infer<typeof employeeSchema>

const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Probation', value: 'probation' },
    { label: 'Resigned', value: 'resigned' },
]

const langOptions = [
    { label: 'TH', value: 'TH' },
    { label: 'EN', value: 'EN' },
]

const branchOptions = [
    { label: 'สำนักงานใหญ่', value: 'hq' },
    { label: 'ฟาร์ม 1', value: 'farm1' },
]

const departmentOptions = [
    { label: 'HR', value: 'hr' },
    { label: 'IT', value: 'it' },
    { label: 'ฝ่ายผลิต', value: 'production' },
]

const roleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
    { label: 'Manager', value: 'manager' },
]

const positionOptions = [
    { label: 'Developer', value: 'dev' },
    { label: 'Accountant', value: 'acc' },
    { label: 'Worker', value: 'worker' },
]

const mockEmployee: EmployeeFormValues = {
    firstNameTH: 'สมชาย',
    lastNameTH: 'ใจดี',
    nickname: 'ชาย',
    firstNameEN: 'Somchai',
    lastNameEN: 'Jaidee',
    weight: 70,
    height: 175,
    phoneNumber: '0812345678',
    status: 'active',
    startDate: new Date(),
    displayNameLang: 'TH',
    branch: 'hq',
    department: 'it',
    role: 'user',
    position: 'dev',
    remark: 'พนักงานดีเด่น',
}

function EmployeeFormContent({
    form,
    isLoading,
    setIsLoading,
}: {
    form: UseFormReturn<EmployeeFormValues>
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
}) {
    const { confirm, AlertDialogComponent } = useAppAlertDialog()
    const { addEmployee } = useAppStore()

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 500))
            form.reset(mockEmployee)
            setIsLoading(false)
            toast.info('โหลดข้อมูลสำเร็จ')
        }
        loadData()
    }, [form, setIsLoading])

    const handleSubmit = async (data: EmployeeFormValues) => {
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log('Employee Data:', data)
            addEmployee({ ...data, id: crypto.randomUUID() })
            toast.success('บันทึกข้อมูลสำเร็จ')
        } catch (error) {
            toast.error('เกิดข้อผิดพลาด')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Work Status */}
            <Card>
                <CardHeader>
                    <CardTitle>สถานะการทำงาน</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 items-start">
                    <AppFormCombobox
                        name="status"
                        label="สถานภาพพนักงาน"
                        placeholder="เลือกสถานะ"
                        options={statusOptions}
                        required
                    />
                    <AppFormField
                        name="startDate"
                        label="วันที่เริ่มทำงาน"
                        required
                    >
                        {(field) => (
                            <DatePicker
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    </AppFormField>
                    <AppFormField name="endDate" label="วันที่สิ้นสุดวันทำงาน">
                        {(field) => (
                            <DatePicker
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    </AppFormField>
                    <AppFormField name="remark" label="หมายเหตุ">
                        <Textarea placeholder="ระบุหมายเหตุ..." />
                    </AppFormField>
                </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
                <CardHeader>
                    <CardTitle>ข้อมูลส่วนตัว</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 items-start">
                    <AppFormCombobox
                        name="displayNameLang"
                        label="ชื่อที่ใช้แสดง"
                        placeholder="เลือกภาษา"
                        options={langOptions}
                        required
                    />
                    <AppFormField name="nickname" label="ชื่อเล่น" required>
                        <Input placeholder="ชื่อเล่น" />
                    </AppFormField>
                    <AppFormField name="firstNameTH" label="ชื่อ (TH)" required>
                        <Input placeholder="ชื่อจริงภาษาไทย" />
                    </AppFormField>
                    <AppFormField name="lastNameTH" label="นามสกุล (TH)" required>
                        <Input placeholder="นามสกุลภาษาไทย" />
                    </AppFormField>
                    <AppFormField name="firstNameEN" label="ชื่อ (EN)">
                        <Input placeholder="First Name" />
                    </AppFormField>
                    <AppFormField name="lastNameEN" label="นามสกุล (EN)">
                        <Input placeholder="Last Name" />
                    </AppFormField>
                    <AppFormField name="weight" label="น้ำหนัก (กก.)" required>
                        <Input type="number" placeholder="0.00" />
                    </AppFormField>
                    <AppFormField name="height" label="ส่วนสูง (ซม.)" required>
                        <Input type="number" placeholder="0" />
                    </AppFormField>
                    <AppFormField name="phoneNumber" label="เบอร์โทรศัพท์" required>
                        <Input type="tel" placeholder="08xxxxxxxx" />
                    </AppFormField>
                </CardContent>
            </Card>

            {/* Department and Position */}
            <Card>
                <CardHeader>
                    <CardTitle>แผนกและตำแหน่ง</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 items-start">
                    <AppFormCombobox
                        name="branch"
                        label="สาขา"
                        placeholder="เลือกสาขา"
                        options={branchOptions}
                        required
                    />
                    <AppFormCombobox
                        name="department"
                        label="แผนก"
                        placeholder="เลือกแผนก"
                        options={departmentOptions}
                        required
                    />
                    <AppFormCombobox
                        name="role"
                        label="บทบาทและสิทธิ"
                        placeholder="เลือกบทบาท"
                        options={roleOptions}
                        required
                    />
                    <AppFormCombobox
                        name="position"
                        label="ตำแหน่งงาน"
                        placeholder="เลือกตำแหน่ง"
                        options={positionOptions}
                        required
                    />
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button
                    type="button"
                    loading={isLoading}
                    onClick={() => {
                        confirm({
                            title: 'ยืนยันการบันทึกข้อมูล?',
                            description: 'กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนบันทึก',
                            cancelText: 'ยกเลิก',
                            actionText: 'ยืนยัน',
                            onAction: form.handleSubmit(handleSubmit),
                        })
                    }}
                >
                    บันทึกข้อมูล
                </Button>
            </div>
            {AlertDialogComponent}
        </div>
    )
}

export function EmployeeForm() {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <AppForm
            schema={employeeSchema}
            defaultValues={{
                status: '',
                displayNameLang: 'TH',
                nickname: '',
                firstNameTH: '',
                lastNameTH: '',
                firstNameEN: '',
                lastNameEN: '',
                branch: '',
                department: '',
                role: '',
                position: '',
                remark: '',
                weight: 0,
                height: 0,
                phoneNumber: '',
            }}
            onSubmit={() => { }} // Handled in content
        >
            {(form) => (
                <EmployeeFormContent
                    form={form}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            )}
        </AppForm>
    )
}
