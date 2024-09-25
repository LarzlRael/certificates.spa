import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react';
import { FormCustomField } from '@/custom_components/forms/FormCustomField';
import { Button } from '@/components/ui/button';


const formSchema = z.object({
  email: z.string().email().min(5),
})

export const ForgotPasswordPage = () => {
  const [searchParams] = useSearchParams()

  // Obtenemos el parámetro 'token'
  const token = searchParams.get('token')
  if (token) {
    window.localStorage.setItem('token', token)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (data) => {
    
  }
  return (
    <div>
      <h2 className="block ">Recuperacion de contraseña</h2>
      <span>
        Por favor ingrese su correo electronico, recibiras un enlace para crear
        una nueva contraseña
      </span>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormCustomField
            isLoading={isLoading}
            control={form.control}
            fieldName="username"
            label="Ingrese su correo electronico"
            placeholder="Correo electronico"
          />
          <Button
            className="flex w-full justify-center rounded-full bg-primary px-3 py-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
              "
            disabled={isLoading}
            type="submit"
          >
            Enviar
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
