import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthStatus, useAuthStore } from '@/store/authStore'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'

import { validateStatus } from '@/utils/utils'
import { postAction } from '@/provider/action/action'
import { UserAuth } from '@/interfaces/auth.interface'
import {
  LabelClickable,
  LabelTitleSubTitleClickable,
} from '@/custom_components/display-text'
import { FormCustomField } from '@/custom_components/forms/react-form-hooks/FormCustomField'
import { useMutationQuery } from '@/hooks/useMutationQuery'
import { withAuth, WithAuthProps } from '@/HOC/withAuth'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(3),
})

interface UserAuthStatus {
  status: number
  data: UserAuth | null | undefined
}

const LoginPage = ({ refreshToken, authStatus }: WithAuthProps) => {
  const navigate = useNavigate()
  /* const { refreshToken } = useAuthStore()
  const authStatus = useAuthStore().authStatus */

  const [isLoading, setIsLoading] = useState(false)
  // 1 - define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(response)
      // response.credential is the google key to send to server
      setIsLoading(true)
      const loginWithGoogle = await postAction<UserAuth>('auth/google-signIn', {
        googleToken: response.access_token,
        idDevice: '123456-google',
      })
      setIsLoading(false)
      if (validateStatus(loginWithGoogle!.status)) {
        window.localStorage.setItem('token', loginWithGoogle!.data!.accessToken)
        await refreshToken()
        toast.success('Login success', {
          duration: 2500,
          position: 'top-right',
        })
        return
      }
    },
  })
  const responseMessage = async (response) => {
    console.log(response)
    // response.credential is the google key to send to server
    setIsLoading(true)
    const loginWithGoogle = await postAction<UserAuth>('auth/google-signIn', {
      googleToken: response.credential,
      idDevice: '123456-google',
    })
    setIsLoading(false)
    if (validateStatus(loginWithGoogle!.status)) {
      window.localStorage.setItem('token', loginWithGoogle!.data!.accessToken)
      await refreshToken()
      toast.success('Login success', { duration: 2500, position: 'top-right' })
      return
    }
  }
  const errorMessage = (error) => {
    console.log(error)
  }

  async function postUserLogin(
    values: z.infer<typeof formSchema>,
  ): Promise<UserAuthStatus> {
    const dataResult = await postAction<UserAuth>('auth/signin', {
      username: values.username,
      password: values.password,
    })
    return {
      status: dataResult.status,
      data: dataResult.data,
    }
  }

  const { mutateAsync: loginUser, isPending } = useMutationQuery<
    UserAuthStatus,
    z.infer<typeof formSchema>
  >({
    mutationFn: postUserLogin,
    onSuccess: async (getUserLogging) => {
      if (validateStatus(getUserLogging.status)) {
        window.localStorage.setItem('token', getUserLogging.data.accessToken)
        await refreshToken()
        toast.success('Login success', {
          duration: 2500,
          position: 'top-right',
        })
        return
      }

      toast.error('Usuario o contraseña invalidos', {
        duration: 2500,
        position: 'bottom-center',
      })
    },
    onError: (error) => {
      console.log(error)
      toast.error(`Error al iniciar sesión: ${error.message}`, {
        duration: 2500,
        position: 'bottom-center',
      })
    },
  })

  useEffect(() => {
    console.log(authStatus)
    if (authStatus == AuthStatus.AUTHENTICATED) {
      navigate('/panel-administrativo')
    }
  }, [authStatus])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Contenedor del formulario */}
      <div className="flex flex-col justify-center px-6 py-12 bg-white shadow-md rounded-lg lg:px-8 max-w-2xl w-full">
        {/* Imagen del logo */}
        <img
          alt=""
          src="./logo_butter_fly.png"
          className="mx-auto h-16 w-auto"
        />
        {/* Título */}
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">
          Bienvenido de nuevo!
        </h2>
        <label
          htmlFor=""
          className="mt-2 text-sm font-normal leading-5 text-gray-600 text-center"
        >
          Inicia sesión en tu cuenta para continuar
        </label>

        {/* Formulario */}
        <div className="mt-10 sm:w-full sm:max-w-lg w-full">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(loginUser)} className="space-y-8">
              {/* Campo de nombre de usuario */}
              <FormCustomField
                isLoading={isPending}
                control={form.control}
                fieldName="username"
                label="Nombre de usuario"
                placeholder="Usuario"
              />
              {/* Campo de contraseña */}
              <FormCustomField
                isLoading={isPending}
                isPasswordField
                control={form.control}
                fieldName="password"
                label="Contraseña"
                placeholder="Ingrese su contraseña"
              />
              {/* Link de "Olvidaste tu contraseña" */}
              <div className="flex items-end justify-center">
                <LabelClickable
                  text="¿Olvidaste tu contraseña?"
                  onClick={() => navigate('/olvide-mi-contraseña')}
                />
              </div>

              {/* Botón de envío */}
              <Button
                className="flex w-full justify-center rounded-full bg-primary px-3 py-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
                disabled={isPending}
                type="submit"
              >
                Submit
              </Button>

              {/* Google Login */}
              <GoogleLogin
                onSuccess={responseMessage}
                onError={(error) => errorMessage(error)}
              />
              <Button
                className="
              flex w-full
              bg-white text-gray-700 border border-gray-300 px-4 py-6 rounded-lg shadow hover:bg-gray-100 flex items-center space-x-2"
                disabled={isLoading}
                type="submit"
                onClick={login}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 mr-2"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.11 0 5.85 1.07 8.03 2.83L38.17 9C34.37 5.7 29.42 4 24 4 14.74 4 7.03 9.58 4 17.24l6.93 5.37C12.75 14.63 17.94 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.5 24.5c0-1.43-.13-2.8-.37-4.13H24v8.26h12.73c-.55 2.92-2.14 5.42-4.54 7.1l6.93 5.37C44.73 36.83 46.5 30.13 46.5 24.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.93 28.61c-.57-1.67-.9-3.44-.9-5.28s.33-3.61.9-5.28l-6.93-5.37C2.68 16.36 2 20.11 2 24s.68 7.64 1.99 10.32l6.94-5.37z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 44c5.42 0 10.12-1.8 13.5-4.88l-6.93-5.37c-1.92 1.3-4.33 2.08-6.57 2.08-6.06 0-11.25-5.13-12.07-11.88l-6.94 5.37C7.03 38.42 14.74 44 24 44z"
                  />
                  <path fill="none" d="M2 2h44v44H2z" />
                </svg>
                <label htmlFor="">
                  <span className="text-sm">Iniciar sesión con google</span>
                </label>
              </Button>

              {/* Link de "No tienes una cuenta" */}
              <LabelTitleSubTitleClickable
                onClick={() => navigate('/registro')}
                text="¿No tienes una cuenta?"
                subtitle="Registrate"
                spacer="mt-4"
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
export const LoginPageWithAuth = withAuth(LoginPage)
