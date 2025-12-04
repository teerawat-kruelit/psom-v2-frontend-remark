'use client'

import { LoginForm } from '@/features/auth/components/login-form'
import { useAppStore } from '@/store/use-app-store'
import { Image } from '@/components/layout/fill-image'
import { Phone } from 'lucide-react'

export default function LoginPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
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
      <footer className="w-full py-3 bg-gray-600 text-white flex flex-col items-center">
        <p className='text-2xl'>แจ้งปัญหาใช้งาน</p>
        <p className='flex items-center gap-2 text-lg'><Phone fill='white' color='white' size={18} /> 065-5162600</p>
        <p className='text-lg'>@hack_2016</p>
        <p className='text-lg'>© สงวนลิขสิทธิ์ 2568 บริษัท โปโลเมคเกอร์ จำกัด</p>
      </footer>
    </div>
  )
}
