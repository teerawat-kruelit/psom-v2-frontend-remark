import { Navbar } from '@/components/layout/navbar'
import { DemoComponent } from '@/features/demo/demo-component'
import { FetchTableDemo } from '@/features/demo/fetch-table-demo'

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex w-full max-w-5xl flex-col items-center gap-8 sm:items-start">
        <h1 className="text-center text-4xl font-bold sm:text-left">Project Initialized</h1>
        <DemoComponent />
        <FetchTableDemo />
      </main>
    </div>
  )
}
