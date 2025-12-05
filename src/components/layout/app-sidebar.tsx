'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

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
    <aside className="scrollbar-hidden h-fit max-h-full w-64 flex-none overflow-y-auto rounded-sm border border-r bg-gray-200 shadow-sm">
      <nav className="flex flex-col gap-1 p-2">
        {menuList.map((menu, index) => {
          if (menu.children && menu.children.length > 0) {
            return (
              <Accordion key={index} type="single" collapsible className="w-full">
                <AccordionItem value={menu.title} className="border-none">
                  <AccordionTrigger className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 hover:no-underline">
                    {menu.title}
                  </AccordionTrigger>
                  <AccordionContent className="scrollbar-hidden max-h-[224px] overflow-y-auto rounded-sm bg-gray-300 pb-0">
                    <div className="mt-1 flex flex-col gap-1">
                      {menu.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.href}
                          data-active={isActive(child.href)}
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-stone-300 data-[active=true]:bg-gray-500 data-[active=true]:text-white"
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
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 data-[active=true]:bg-gray-500 data-[active=true]:text-white"
            >
              {menu.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
