import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AuthStatus, useAuthStore } from '@/store/authStore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateStatus } from '@/utils/utils'
import { postAction } from '@/provider/action/action'
import { UserAuth } from '@/interfaces/auth.interface'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(3),
})
export const LoginPage = () => {
  const navigate = useNavigate()
  const { refreshToken } = useAuthStore()
  const authStatus = useAuthStore().authStatus

  const [isLoading, setIsLoading] = useState(false)
  // 1 - define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    setIsLoading(true)

    const getUserLogging = await postAction<UserAuth>('auth/signin', {
      username: values.username,
      password: values.password,
    })

    if (!validateStatus(getUserLogging!.status)) return

    window.localStorage.setItem('token', getUserLogging.data.accessToken)
    await refreshToken()
  }
  useEffect(() => {
    console.log(authStatus)
    if (authStatus == AuthStatus.AUTHENTICATED) {
      navigate('/dashboard')
    }
  }, [authStatus])

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Ingrese su contraseña"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  )
}
