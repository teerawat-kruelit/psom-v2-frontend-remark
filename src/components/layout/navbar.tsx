'use client'

import Link from 'next/link'

import { useIsMobile } from '@/hooks/use-mobile'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { HomeIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MenuType {
  title: string
  href: string
  icon?: React.ReactNode
  children?: MenuType[]
}

export function Navbar() {
  const isMobile = useIsMobile()

  const menus: MenuType[] = [
    { title: 'จัดการข้อมูล', href: '/data-management', children: [] },
    { title: 'แบบตัดมาตรฐาน', href: '#', children: [] },
    { title: 'ใบเสนอราคา', href: '#' },
    { title: 'ใบสั่งขายสำเร็จรูป', href: '#' },
    { title: 'ใบสั่งขายสั่งตัด', href: '#' },
    { title: 'ใบนำส่งสินค้า', href: '#' },
    { title: 'สินค้าพร้อมจัดส่ง', href: '#' },
    { title: 'รายงาน', href: '#' },
  ]

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="hidden flex-wrap gap-x-6 md:flex">
        {menus.map((menu: MenuType) =>
          menu.children && menu.children.length > 0 ? (
            <NavigationMenuItem key={menu.title}>
              <NavigationMenuTrigger className="hover:text-primary hover:border-primary rounded-none bg-transparent px-0 font-normal hover:border-b-2 hover:bg-transparent">
                {menu.title}
              </NavigationMenuTrigger>
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
          ) : (
            <NavigationMenuItem key={menu.title}>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  'hover:text-primary hover:border-primary rounded-none bg-transparent px-0 font-normal hover:border-b-2 hover:bg-transparent'
                )}
              >
                <Link href={menu.href} className="flex-row items-center gap-2">
                  {menu.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
