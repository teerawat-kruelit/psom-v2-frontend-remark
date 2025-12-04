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
            <header className="flex w-full h-[50px] items-center justify-between px-8 py-2 bg-white border-b">
                <div className="w-[60px] h-[40px]">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        priority
                        imageType="object-contain"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="w-8 h-8">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="default"
                        className="bg-red-500 hover:bg-red-600 text-white transition-all duration-300 gap-0 w-8 hover:w-[130px] h-8 p-0 overflow-hidden group flex items-center justify-center hover:justify-start hover:px-3"
                        onClick={logout}
                    >
                        <Power className="h-5 w-5 shrink-0" />
                        <span className="w-0 overflow-hidden group-hover:w-auto group-hover:ml-2 transition-all duration-300 whitespace-nowrap opacity-0 group-hover:opacity-100">
                            ออกจากระบบ
                        </span>
                    </Button>
                </div>
            </header>
            <div className="w-full bg-[#b7babf] border-b flex justify-center px-8 py-1">
                <Navbar />
            </div>
        </>
    )
}
