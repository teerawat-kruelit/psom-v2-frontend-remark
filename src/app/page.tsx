import { PageHeader } from '@/components/layout/page-header'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <PageHeader />
      <main className="container mx-auto flex-1 p-8">
        <div className="min-h-[500px] rounded-lg bg-white p-6 shadow">
          <h1 className="mb-4 text-2xl font-bold">Content</h1>
          <p className="text-gray-600">Main content area...</p>
        </div>
      </main>
    </div>
  )
}
