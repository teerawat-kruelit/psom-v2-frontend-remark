import { PageHeader } from '@/components/layout/page-header'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <PageHeader />
      <main className="container mx-auto flex-1 p-8"></main>
    </div>
  )
}
