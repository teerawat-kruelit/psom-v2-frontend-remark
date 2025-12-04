import { Image } from '@/components/layout/fill-image'
import { LoginForm } from '@/features/auth/login-form'
import { useAppStore } from '@/store/use-app-store'
import { LoginFooter } from '@/features/auth/login-footer'

export default function Page() {
  return (<div className="flex flex-col min-h-screen">
    <div className="flex-1 flex flex-col items-center justify-center gap-8">
      <div className="w-[220px] h-[100px] mx-auto">
        <Image
          src="/logo.png"
          alt="logo"
          priority
          imageType="object-contain"
        />
      </div>
      <h1 className="text-3xl tracking-wide">Program of Sale to Operation Management</h1>
      <div className="w-[300px]">
        <LoginForm onSubmit={useAppStore((state) => state.login)} />
      </div>
    </div>
    <LoginFooter />
  </div>)
}
