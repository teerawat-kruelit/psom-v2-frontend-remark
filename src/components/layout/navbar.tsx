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

interface MenuType {
    title: string
    href: string
    icon?: React.ReactNode
    children?: MenuType[]
}


export function Navbar() {
    const isMobile = useIsMobile()

    const menus: MenuType[] = [
        {
            title: "Home", href: "/", children: [
                { title: "Backlog", href: "/about/backlog", icon: <HomeIcon /> },
                { title: "To Do", href: "/about/todo", icon: <HomeIcon /> },
                { title: "Done", href: "/about/done", icon: <HomeIcon /> },
            ]
        },
        {
            title: "About", href: "/about",
            children: [
                { title: "Backlog", href: "/about/backlog", icon: <HomeIcon /> },
                { title: "To Do", href: "/about/todo", icon: <HomeIcon /> },
                { title: "Done", href: "/about/done", icon: <HomeIcon /> },
            ]
        },
        { title: "Contact", href: "/contact" },
    ]

    return (
        <NavigationMenu viewport={isMobile}>
            <NavigationMenuList className="flex-wrap hidden md:flex">
                {
                    menus.map((menu: MenuType) => menu.children && menu.children.length > 0 ? (
                        <NavigationMenuItem key={menu.title}>
                            <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
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
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href={menu.href} className="flex-row items-center gap-2">
                                {menu.title}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>)
                    )
                }
            </NavigationMenuList>
        </NavigationMenu>
    )
}
