'use client'

import { LoginForm } from '@/features/auth/components/login-form'
import { useAppStore } from '@/store/use-app-store'
import { Image } from '@/components/layout/fill-image'
import { Navbar } from '@/components/layout/navbar'

export function LoginPage() {

  return (
    <div className="flex flex-col gap-8 min-h-screen items-center justify-center">
      <Navbar />
      <div className="w-[220px] h-[100px] mx-auto">
        <Image
          src="/logo.png"
          alt="Pig Farm Background"
          priority
          imageType="object-contain"
        />
      </div>
      <h1 className="text-3xl tracking-wide">Program of Sale to Operation Management</h1>
      <div className="w-[300px]">
        <LoginForm onSubmit={useAppStore((state) => state.login)} />
      </div>
    </div>
  )
}
