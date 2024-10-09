import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { FormCustomInput } from '@/custom_components/forms/react-form-hooks'
import { Button } from '@/components/ui/button'
import {
  LabelClickable,
  LabelTitleSubTitleClickable,
} from '@/custom_components/display-text'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(3),
})

interface LoginMiniContainerProps {
  handleChange?: () => void
}
export const LoginMiniContainer = ({
  handleChange,
}: LoginMiniContainerProps) => {
  const [isLoading, setIsLoading] = useState(false)
  // 1 - define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const navigate = useNavigate()

  const loginUser = async (data: any) => {}

  return (
    <div className="flex justify-center items-center bg-white">
      {/* Contenedor principal con tamaño fijo y adaptativo */}
      <div className="w-[90%] max-w-[450px] flex flex-col justify-center px-5 pt-0">
        {/* Contenido del formulario */}
        <div className="my-auto mb-auto mt-1">
          <p className="text-[24px] font-bold text-zinc-950 dark:text-white">
            Iniciar sesion
          </p>
          <p className="mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-zinc-400">
            Para inscribirse en este curso debe iniciar sesión
          </p>

          {/* Formulario */}
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(loginUser)}
              className="space-y-8 mt-8"
            >
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <FormCustomInput
                    inputType="text"
                    isLoading={isLoading}
                    control={form.control}
                    fieldName="username"
                    label="Nombre de usuario"
                    placeholder="Usuario"
                  />
                  <FormCustomInput
                    isLoading={isLoading}
                    inputType="password"
                    control={form.control}
                    fieldName="password"
                    label="Contraseña"
                    placeholder="Ingrese su contraseña"
                  />
                </div>
                <Button
                  className="flex w-full justify-center rounded-full bg-primary px-3 py-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
                  disabled={isLoading}
                  type="submit"
                >
                  Ingresar
                </Button>
              </div>
            </form>
          </FormProvider>

          <p className="mt-4">
            <LabelClickable
              text="¿Olvidaste tu contraseña?"
              onClick={() => navigate('/olvide-mi-contraseña')}
            />
          </p>

          <p>
            <LabelTitleSubTitleClickable
              onClick={() => {
                console.log("Clicked")
                if (handleChange) {
                  handleChange()
                }
              }}
              text="¿No tienes una cuenta?"
              subtitle="Registrate"
              spacer="mt-4"
            />
          </p>
        </div>
      </div>

      {/* Footer */}
      {/* <p className='font-normal text-zinc-950 mt-20 mx-auto w-max'>
        Auth Form from{' '}
        <a
          href='https://horizon-ui.com/shadcn-ui?ref=twcomponents'
          target='_blank'
          className='text-brand-500 font-bold'
        >
          Horizon AI Boilerplate
        </a>
      </p> */}
    </div>
  )
}

{
  /*  <button
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 w-full text-zinc-950 py-6 dark:text-white"
                                type="submit"/>
                                <span className="mr-2"><svg stroke="currentColor" fill="currentColor"
                                        stroke-width="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48"
                                        enable-background="new 0 0 48 48" className="h-5 w-5" height="1em" width="1em"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
    c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
    c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
    C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
    c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
    c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z">
                                        </path>
                                    </svg></span>
                                    <span>Google</span></button> */
}
