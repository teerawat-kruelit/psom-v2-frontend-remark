'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useEffect, useState } from 'react'

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
  const [openItems, setOpenItems] = useState<string[]>([])

  const isActive = (href: string) => pathname === href
  const activeKey = menuList.find((menu) => menu.children?.some((child) => isActive(child.href)))?.title

  useEffect(() => {
    if (activeKey) {
      setOpenItems((prev) => {
        if (prev.includes(activeKey)) return prev
        return Array.from(new Set([...prev, activeKey]))
      })
    }
  }, [activeKey])

  const handleValueChange = (value: string[]) => {
    let nextValue = activeKey && !value.includes(activeKey) ? [...value, activeKey] : value
    if (activeKey) {
      const others = nextValue.filter((k) => k !== activeKey)

      if (others.length > 1) {
        const newlyOpened = nextValue.find((k) => !openItems.includes(k))

        if (newlyOpened) {
          nextValue = [activeKey, newlyOpened]
        } else {
          nextValue = [activeKey, others[others.length - 1]]
        }
      }
    } else {
      if (nextValue.length > 1) {
        const newlyOpened = nextValue.find((k) => !openItems.includes(k))
        if (newlyOpened) {
          nextValue = [newlyOpened]
        } else {
          nextValue = [nextValue[nextValue.length - 1]]
        }
      }
    }

    setOpenItems(nextValue)
  }

  return (
    <aside className="scrollbar-hidden h-fit max-h-full w-58 flex-none overflow-y-auto rounded-sm border border-r bg-gray-300 shadow-sm">
      <nav className="flex flex-col gap-1 p-2">
        <Accordion type="multiple" className="w-full" value={openItems} onValueChange={handleValueChange}>
          {menuList.map((menu, index) => {
            if (menu.children && menu.children.length > 0) {
              return (
                <AccordionItem key={menu.title} value={menu.title} className="border-none">
                  <AccordionTrigger className="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 hover:no-underline">
                    {menu.title}
                  </AccordionTrigger>
                  <AccordionContent className="scrollbar-hidden max-h-[224px] overflow-y-auto rounded-sm bg-stone-400/35 pb-0">
                    <div className="flex flex-col gap-1 p-1">
                      {menu.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.href}
                          data-active={isActive(child.href)}
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-stone-300 data-[active=true]:bg-gray-500 data-[active=true]:text-white"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            }
            return (
              <div key={index} className="py-1">
                <Link
                  href={menu.href}
                  data-active={isActive(menu.href)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-300 data-[active=true]:bg-gray-500 data-[active=true]:text-white"
                >
                  {menu.title}
                </Link>
              </div>
            )
          })}
        </Accordion>
      </nav>
    </aside>
  )
}
