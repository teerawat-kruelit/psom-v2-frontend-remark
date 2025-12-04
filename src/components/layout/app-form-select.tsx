'use client'

import React from 'react'
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { FormControl } from '@/components/ui/form'
import { AppFormField } from '@/components/layout/app-form-field'

interface AppFormSelectProps {
    name: string
    label: string | React.ReactNode
    placeholder?: string
    children: React.ReactNode
    required?: boolean
}

export function AppFormSelect({
    name,
    label,
    placeholder,
    children,
    required,
}: AppFormSelectProps) {
    return (
        <AppFormField name={name} label={label} required={required}>
            {(field) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>{children}</SelectContent>
                </Select>
            )}
        </AppFormField>
    )
}
