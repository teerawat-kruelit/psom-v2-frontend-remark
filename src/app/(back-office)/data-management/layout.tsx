'use client'

import { useState } from 'react'
import { AppSidebar, MenuItem } from '@/components/layout/app-sidebar'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const menuList: MenuItem[] = [
    { href: '/data-management/branch-management', title: 'จัดการสาขา' },
    { href: '/data-management/department-management', title: 'จัดการแผนก' },
    { href: '/data-management/position-management', title: 'จัดการตำแหน่ง' },
    { href: '/data-management/role-management', title: 'จัดการบทบาทและสิทธิ์' },
    { href: '/data-management/employee-management', title: 'จัดการพนักงาน' },
    { href: '/data-management/product-category-management', title: 'จัดการหมวดหมู่สินค้า' },
    {
        title: 'จัดการรายละเอียด',
        href: '#',
        children: [
            { href: '/data-management/comp-package-management', title: 'จัดการข้อมูลแพคเกจ' },
            { href: '/data-management/comp-fabric-management', title: 'จัดการข้อมูลผ้า' },
            { href: '/data-management/comp-color-management', title: 'จัดการข้อมูลสี' },
            { href: '/data-management/comp-standard-pattern-management', title: 'จัดการข้อมูลแบบตัดต่อ' },
            { href: '/data-management/comp-size-type-management', title: 'จัดการข้อมูลประเภทขนาด' },
            { href: '/data-management/comp-sleeve-length-management', title: 'จัดการข้อมูลแบบแขนเสื้อ' },
            { href: '/data-management/comp-shirt-fit-management', title: 'จัดการข้อมูลแบบทรงเสื้อ' },
            { href: '/data-management/comp-printing-type-management', title: 'จัดการข้อมูลงานพิมพ์ลาย' },
            { href: '/data-management/comp-collar-style-management', title: 'จัดการข้อมูลแบบคอและปก' },
            { href: '/data-management/comp-neck-taping-style-management', title: 'จัดการข้อมูลแบบดามคอเสื้อ' },
            { href: '/data-management/comp-sleeve-cuff-style-management', title: 'จัดการข้อมูลแบบปลายแขน' },
            { href: '/data-management/comp-collar-cuff-pattern-management', title: 'จัดการข้อมูลแบบลายทอปกและจั๊มแขน' },
            { href: '/data-management/comp-collar-cuff-properties-management', title: 'จัดการข้อมูลคุณสมบัติการทอปกและจั๊มแขน' },
            { href: '/data-management/comp-placket-style-size-management', title: 'จัดการข้อมูลทรงและขนาดสาบกระดุม' },
            { href: '/data-management/comp-placket-style-management', title: 'จัดการข้อมูลแบบสาบกระดุม' },
            { href: '/data-management/comp-piping-style-management', title: 'จัดการข้อมูลแบบกุ๊น' },
            { href: '/data-management/comp-button-style-management', title: 'จัดการข้อมูลแบบและสีกระดุม' },
            { href: '/data-management/comp-hem-style-management', title: 'จัดการข้อมูลแบบชายเสื้อ' },
            { href: '/data-management/comp-shirt-length-management', title: 'จัดการข้อมูลความยาวเสื้อ' },
            { href: '/data-management/comp-side-slit-style-management', title: 'จัดการข้อมูลแบบผ่าข้าง' },
            { href: '/data-management/comp-pocket-style-management', title: 'จัดการข้อมูลแบบกระเป๋า' },
            { href: '/data-management/comp-pen-holder-management', title: 'จัดการข้อมูลที่เสียบปากกา' },
            { href: '/data-management/comp-size-label-style-management', title: 'จัดการข้อมูลแบบป้ายไซส์' },
            { href: '/data-management/comp-packaging-method-management', title: 'จัดการข้อมูลวิธีบรรจุสินค้า' }
        ]
    },
    { href: '/data-management/product-management', title: 'จัดการสินค้า' },
    { href: '/data-management/customer-management', title: 'จัดการลูกค้า' },
    { href: '/data-management/promotion-management', title: 'จัดการโปรโมชั่น' }
]

export default function DataManagementLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div className="flex h-full p-2 gap-2 relative">
            <div className={cn(
                "transition-all duration-300 ease-in-out overflow-hidden",
                isOpen ? "w-64 opacity-100" : "w-0 opacity-0"
            )}>
                <AppSidebar menuList={menuList} />
            </div>
            <main className="flex-1 overflow-y-auto p-6 bg-gray-50 transition-all duration-300">
                {children}
            </main>
            <Button
                variant="default"
                size="icon"
                className={cn(
                    "absolute top-4 rounded-full z-50 w-8 h-8 bg-gray-400/90 hover:bg-gray-400 text-white transition-all duration-300 ease-in-out",
                    isOpen ? "left-[280px]" : "left-6"
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <ChevronLeft className={cn("h-5 w-5 transition-transform duration-300", !isOpen && "rotate-180")} />
            </Button>
        </div>
    )
}
