'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export interface MenuItem {
    title: string
    href: string
    children?: MenuItem[]
}

interface AppSidebarProps {
    menuList: MenuItem[]
}

export function AppSidebar({ menuList }: AppSidebarProps) {
    const pathname = usePathname()

    const isActive = (href: string) => pathname === href

    return (
        <aside className="w-64 flex-none h-fit max-h-full overflow-y-auto border-r bg-gray-200 rounded-sm border shadow-sm scrollbar-hidden">
            <nav className="flex flex-col gap-1 p-2">
                {menuList.map((menu, index) => {
                    if (menu.children && menu.children.length > 0) {
                        return (
                            <Accordion key={index} type="single" collapsible className="w-full">
                                <AccordionItem value={menu.title} className="border-none">
                                    <AccordionTrigger className="px-3 py-2 text-sm font-medium hover:bg-gray-300 text-gray-700 hover:no-underline rounded-md">
                                        {menu.title}
                                    </AccordionTrigger>
                                    <AccordionContent className='bg-gray-300 pb-0 rounded-sm max-h-[224px] overflow-y-auto scrollbar-hidden'>
                                        <div className="flex flex-col gap-1 mt-1">
                                            {menu.children.map((child, childIndex) => (
                                                <Link
                                                    key={childIndex}
                                                    href={child.href}
                                                    data-active={isActive(child.href)}
                                                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-stone-300 data-[active=true]:bg-gray-500 text-gray-700 data-[active=true]:text-white transition-colors"
                                                >
                                                    {child.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        )
                    }

                    return (
                        <Link
                            key={index}
                            href={menu.href}
                            data-active={isActive(menu.href)}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-300 data-[active=true]:bg-gray-500 text-gray-700 data-[active=true]:text-white transition-colors"
                        >
                            {menu.title}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
