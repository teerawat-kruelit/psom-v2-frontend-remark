import { EmployeeForm } from '@/features/employees/components/employee-form'

export default function NewEmployeePage() {
  return (
    <div className="container mx-auto max-w-[600px] py-10">
      <h1 className="mb-6 text-3xl font-bold">เพิ่มพนักงานใหม่</h1>
      <EmployeeForm />
    </div>
  )
}
