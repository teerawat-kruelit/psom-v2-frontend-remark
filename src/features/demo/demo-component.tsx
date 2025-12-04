'use client'

import { useAppStore } from '@/store/use-app-store'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function DemoComponent() {
  const { count, increment, decrement } = useAppStore()

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border p-8 shadow-sm">
      <h2 className="text-2xl font-bold">Stack Verification</h2>

      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={decrement}>
          -
        </Button>
        <span className="font-mono text-xl">{count}</span>
        <Button variant="outline" onClick={increment}>
          +
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <Button color="green" onClick={() => toast.success('Operation completed successfully.')}>
          Success
        </Button>
        <Button color="red" onClick={() => toast.error('Something went wrong.')}>
          Error
        </Button>
        <Button color="blue" onClick={() => toast.info('Here is some information.')}>
          Info
        </Button>
        <Button color="orange" onClick={() => toast.warning('Please be careful.')}>
          Warning
        </Button>
      </div>
    </div>
  )
}
