'use client'

import { useState, useCallback } from 'react'
import { AppAlertDialog } from '@/components/layout/app-alert-dialog'

interface AlertDialogConfig {
  title: string
  description: string
  cancelText?: string
  actionText?: string
  onAction: () => void
}

export function useAppAlertDialog() {
  const [open, setOpen] = useState(false)
  const [config, setConfig] = useState<AlertDialogConfig | null>(null)

  const confirm = useCallback((newConfig: AlertDialogConfig) => {
    setConfig(newConfig)
    setOpen(true)
  }, [])

  const AlertDialogComponent = config ? (
    <AppAlertDialog
      open={open}
      onOpenChange={setOpen}
      title={config.title}
      description={config.description}
      cancelText={config.cancelText || 'ยกเลิก'}
      actionText={config.actionText || 'ยืนยัน'}
      onAction={config.onAction}
    />
  ) : null

  return {
    confirm,
    AlertDialogComponent,
  }
}
