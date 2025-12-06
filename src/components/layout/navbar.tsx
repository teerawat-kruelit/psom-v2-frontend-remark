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
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

interface MenuType {
  title: string
  href: string
  icon?: React.ReactNode
  children?: MenuType[]
}

export function Navbar() {
  const isMobile = useIsMobile()
  const currentPath = usePathname()

  const menus: MenuType[] = [
    { title: 'จัดการข้อมูล', href: '/data-management', children: [] },
    { title: 'แบบตัดมาตรฐาน', href: '#', children: [{ title: 'ใบเสนอราคา', href: '#' }] },
    { title: 'ใบเสนอราคา', href: '#' },
    { title: 'ใบสั่งขายสำเร็จรูป', href: '#' },
    { title: 'ใบสั่งขายสั่งตัด', href: '#' },
    { title: 'ใบนำส่งสินค้า', href: '#' },
    { title: 'สินค้าพร้อมจัดส่ง', href: '#' },
    { title: 'รายงาน', href: '#' },
  ]

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap gap-x-4">
        {menus.map((menu: MenuType) =>
          menu.children && menu.children.length > 0 ? (
            <NavigationMenuItem key={menu.title}>
              <NavigationMenuTrigger
                data-menu-active={currentPath.startsWith(menu.href)}
                className={cn(
                  'hover:text-primary hover:border-primary rounded-none border-b-2 border-transparent bg-transparent px-2 font-normal hover:border-b-2 hover:!bg-transparent focus:!bg-transparent data-[active]:!bg-transparent data-[state=open]:!bg-transparent',
                  'data-[menu-active=true]:!bg-primary data-[menu-active=true]:text-primary-foreground data-[menu-active=true]:rounded-sm'
                )}
              >
                {menu.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="z-50">
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
                data-active={currentPath.startsWith(menu.href)}
                className={cn(
                  navigationMenuTriggerStyle(),
                  'hover:text-primary hover:border-primary rounded-none border-b-2 border-transparent bg-transparent px-2 font-normal hover:border-b-2 hover:!bg-transparent focus:!bg-transparent data-[active]:!bg-transparent data-[state=open]:!bg-transparent',
                  'data-[active=true]:!bg-primary data-[active=true]:text-primary-foreground data-[active=true]:rounded-sm'
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
