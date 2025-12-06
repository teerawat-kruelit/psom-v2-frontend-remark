'use client'

import React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FormControl } from '@/components/ui/form'
import { AppFormField } from '@/components/layout/app-form-field'

interface Option {
  label: string
  value: string
}

interface AppFormComboboxProps {
  name: string
  label: string | React.ReactNode
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  options: Option[]
  required?: boolean
}

export function AppFormCombobox({
  name,
  label,
  placeholder = '',
  searchPlaceholder = 'ค้นหา...',
  emptyText = 'ไม่พบข้อมูล',
  options,
  required,
}: AppFormComboboxProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <AppFormField name={name} label={label} required={required}>
      {(field) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
              >
                <span>
                  {field.value
                    ? options.find((option) => option.value === field.value)?.label
                    : required
                      ? placeholder
                      : 'ไม่ระบุ'}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandList>
                <CommandEmpty>{emptyText}</CommandEmpty>
                <CommandGroup>
                  {[...(!required ? [{ label: 'ไม่ระบุ', value: undefined }] : []), ...(options || [])].map(
                    (option) => (
                      <CommandItem
                        value={option.value}
                        key={option.value || 'undefined'}
                        onSelect={() => {
                          field.onChange(option.value)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            option.value === field.value || (option.value === '' && field.value === undefined)
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    )
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </AppFormField>
  )
}
