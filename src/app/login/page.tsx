'use client'

import { Image } from '@/components/layout/fill-image'
import { LoginForm, type LoginFormValues } from '@/features/auth/login-form'
import { LoginFooter } from '@/features/auth/login-footer'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="mx-auto h-[100px] w-[220px]">
          <Image src="/logo.png" alt="logo" priority imageType="object-contain" />
        </div>
        <h1 className="text-3xl tracking-wide">Program of Sale to Operation Management</h1>
        <div className="w-[300px]">
          <LoginForm />
        </div>
      </div>
      <LoginFooter />
    </div>
  )
}
