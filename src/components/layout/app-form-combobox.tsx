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
  placeholder = 'Select option',
  searchPlaceholder = 'Search...',
  emptyText = 'No results found.',
  options,
  required,
}: AppFormComboboxProps) {
  return (
    <AppFormField name={name} label={label} required={required}>
      {(field) => (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
              >
                {field.value ? options.find((option) => option.value === field.value)?.label : placeholder}
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
                  {options.map((option) => (
                    <CommandItem
                      value={option.label}
                      key={option.value}
                      onSelect={() => {
                        field.onChange(option.value)
                      }}
                    >
                      <Check
                        className={cn('mr-2 h-4 w-4', option.value === field.value ? 'opacity-100' : 'opacity-0')}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </AppFormField>
  )
}
