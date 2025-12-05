import { Image } from '@/components/layout/fill-image'
import { LoginForm } from '@/features/auth/login-form'
import { useAppStore } from '@/store/use-app-store'
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
          <LoginForm onSubmit={useAppStore((state) => state.login)} />
        </div>
      </div>
      <LoginFooter />
    </div>
  )
}
