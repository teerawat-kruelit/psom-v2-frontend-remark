'use client'

import { useState } from 'react'
import * as z from 'zod'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { AppForm } from '@/components/layout/app-form'
import { AppFormField } from '@/components/layout/app-form-field'

const loginSchema = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
})

export type LoginFormValues = z.infer<typeof loginSchema>

interface LoginFormProps {
    className?: string
    onSubmit?: (data: LoginFormValues) => Promise<void>
}

export function LoginForm({ className, onSubmit }: LoginFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    async function handleSubmit(data: LoginFormValues) {
        setIsLoading(true)
        try {
            if (onSubmit) {
                await onSubmit(data)
            } else {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                toast.success('Login Successful')
            }
        } catch (error) {
            toast.error('Login Failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn('grid gap-6', className)}>
            <AppForm schema={loginSchema} defaultValues={{ username: '', password: '' }} onSubmit={handleSubmit}>
                {(form) => (
                    <>
                        <AppFormField name="username" label="Username" required>
                            <Input
                                size={'lg'}
                                placeholder="username"
                                prefix={<User />}
                            />
                        </AppFormField>
                        <AppFormField name="password" label="Password" required>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                size={'lg'}
                                placeholder="••••••••"
                                prefix={<Lock />}
                                suffix={showPassword ? <Eye onClick={() => setShowPassword(false)} /> : <EyeOff onClick={() => setShowPassword(true)} />}
                            />
                        </AppFormField>
                        <Button type="submit" size={'lg'} color='dark' className="w-full" loading={isLoading}>
                            เข้าสู่ระบบ
                        </Button>
                    </>
                )}
            </AppForm>
        </div>
    )
}
