'use client'

import { Bell, LogOut, Power } from 'lucide-react'
import { Image } from '@/components/layout/fill-image'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/use-app-store'
import { Navbar } from './navbar'

export function PageHeader() {
  const logout = useAppStore((state) => state.logout)

  return (
    <>
      <header className="flex h-[50px] w-full items-center justify-between border-b bg-white px-8 py-2">
        <div className="h-[40px] w-[60px]">
          <Image src="/logo.png" alt="Logo" priority imageType="object-contain" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="default"
            className="group flex h-8 w-8 items-center justify-center gap-0 overflow-hidden bg-red-500 p-0 text-white transition-all duration-300 hover:w-[130px] hover:justify-start hover:bg-red-600 hover:px-3"
            onClick={logout}
          >
            <Power className="h-5 w-5 shrink-0" />
            <span className="w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:w-auto group-hover:opacity-100">
              ออกจากระบบ
            </span>
          </Button>
        </div>
      </header>
      <div className="flex w-full justify-center border-b bg-[#b7babf] px-8 py-1">
        <Navbar />
      </div>
    </>
  )
}
