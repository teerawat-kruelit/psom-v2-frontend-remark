import { Navbar } from '@/components/layout/navbar'
import { PageHeader } from '@/components/layout/page-header'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PageHeader />
      <main className="flex-1 p-8 container mx-auto">
        <div className="bg-white rounded-lg shadow p-6 min-h-[500px]">
          <h1 className="text-2xl font-bold mb-4">Content</h1>
          <p className="text-gray-600">Main content area...</p>
        </div>
      </main>
    </div>
  )
}
