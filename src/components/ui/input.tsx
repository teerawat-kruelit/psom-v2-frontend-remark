import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const inputVariants = cva('', {
  variants: {
    size: {
      default: 'h-9 px-3 text-base',
      sm: 'h-8 px-2 text-xs',
      md: 'h-9 px-3 text-base',
      lg: 'h-10 px-4 text-lg',
      xl: 'h-12 px-5 text-xl',
      ['2xl']: 'h-14 px-6 text-2xl',
      ['3xl']: 'h-16 px-7 text-3xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'prefix' | 'size'>, VariantProps<typeof inputVariants> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

function Input({ className, type, prefix, suffix, size, ...props }: InputProps) {
  return (
    <div className="relative flex items-center">
      {prefix && <div className="text-muted-foreground absolute left-3 flex h-4 w-4 items-center">{prefix}</div>}
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-white file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          inputVariants({ size }),
          prefix && 'pl-9',
          suffix && 'pr-9',
          className
        )}
        {...props}
      />
      {suffix && <div className="text-muted-foreground absolute right-3 flex h-4 w-4 items-center">{suffix}</div>}
    </div>
  )
}

export { Input }
