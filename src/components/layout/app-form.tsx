'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn, DefaultValues, FieldValues, SubmitHandler } from 'react-hook-form'
import { ZodSchema } from 'zod'
import { Form } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import React, { createContext, useContext } from 'react'

type AppFormContextValue = {
  readOnly?: boolean
}

const AppFormContext = createContext<AppFormContextValue>({})

export const useAppFormContext = () => useContext(AppFormContext)

interface AppFormProps<T extends FieldValues> {
  schema: ZodSchema<T>
  defaultValues: DefaultValues<T>
  onSubmit: SubmitHandler<T>
  children: (form: UseFormReturn<T>) => React.ReactNode
  className?: string
  readOnly?: boolean
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all'
  autoComplete?: string
}

export function AppForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
  readOnly,
  mode = 'onSubmit',
  autoComplete = 'off',
}: AppFormProps<T>) {
  const form = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues,
    mode,
  })

  return (
    <Form {...form}>
      <AppFormContext.Provider value={{ readOnly }}>
        <form
          onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
          className={cn('space-y-4', className)}
          autoComplete={autoComplete}
        >
          {children(form)}
        </form>
      </AppFormContext.Provider>
    </Form>
  )
}
