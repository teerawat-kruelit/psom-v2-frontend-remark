import React from 'react'
import { ControllerRenderProps, FieldValues, useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

interface AppFormFieldProps {
  name: string
  label: string | React.ReactNode
  children: React.ReactNode | ((field: ControllerRenderProps<FieldValues, string>) => React.ReactNode)
  required?: boolean
}

import { useAppFormContext } from '@/components/layout/app-form'

export function AppFormField({ name, label, children, required }: AppFormFieldProps) {
  const { control } = useFormContext()
  const { readOnly } = useAppFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-destructive">*</span>}
          </FormLabel>
          {typeof children === 'function' ? (
            children({ ...field, disabled: readOnly })
          ) : (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <FormControl {...field} {...({ readOnly, disabled: readOnly } as any)}>
              {children}
            </FormControl>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
