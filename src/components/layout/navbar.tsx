"use client"

import Link from "next/link"

import { useIsMobile } from "@/hooks/use-mobile"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { HomeIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MenuType {
    title: string
    href: string
    icon?: React.ReactNode
    children?: MenuType[]
}


export function Navbar() {
    const isMobile = useIsMobile()

    const menus: MenuType[] = [
        { title: "จัดการข้อมูล", href: "#", children: [] },
        { title: "แบบตัดมาตรฐาน", href: "#", children: [] },
        { title: "ใบเสนอราคา", href: "#" },
        { title: "ใบสั่งขายสำเร็จรูป", href: "#" },
        { title: "ใบสั่งขายสั่งตัด", href: "#" },
        { title: "ใบนำส่งสินค้า", href: "#" },
        { title: "สินค้าพร้อมจัดส่ง", href: "#" },
        { title: "รายงาน", href: "#" },
    ]

    return (
        <NavigationMenu viewport={isMobile}>
            <NavigationMenuList className="flex-wrap gap-x-6 hidden md:flex">
                {
                    menus.map((menu: MenuType) => menu.children && menu.children.length > 0 ? (
                        <NavigationMenuItem key={menu.title}>
                            <NavigationMenuTrigger className="px-0 rounded-none bg-transparent hover:bg-transparent font-normal hover:text-primary hover:border-primary hover:border-b-2">{menu.title}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid min-w-[200px] gap-4">
                                    {menu.children.map((child: MenuType) => (
                                        <li key={child.title}>
                                            <NavigationMenuLink asChild>
                                                <Link href={child.href} className="flex-row items-center gap-2">
                                                    {child?.icon}
                                                    {child.title}
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ) : (<NavigationMenuItem key={menu.title}>
                        <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "px-0 rounded-none bg-transparent hover:bg-transparent font-normal hover:text-primary hover:border-primary hover:border-b-2")}>
                            <Link href={menu.href} className="flex-row items-center gap-2">
                                {menu.title}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>)
                    )
                }
            </NavigationMenuList >
        </NavigationMenu >
    )
}
