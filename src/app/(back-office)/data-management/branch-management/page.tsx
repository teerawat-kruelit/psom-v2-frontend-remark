import { BranchManagementTable } from "@/features/data-management/branch-management/branch-management-table"

export default function BranchManagementPage() {
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-medium tracking-wide">จัดการข้อมูลสาขา</h1>
            <BranchManagementTable />
        </div>
    )
}