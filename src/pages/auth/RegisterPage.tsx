import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthStatus, useAuthStore } from "@/store/authStore";
/* import { GoogleLogin } from "@react-oauth/google"; */

import { validateStatus } from "@/utils/utils";
import { postAction } from "@/provider/action/action";
import { UserAuth } from "@/interfaces/auth.interface";
import { LabelTitleSubTitleClickable } from "@/custom_components/display-text";
import { FormCustomInput } from "@/custom_components/forms/react-form-hooks/FormCustomInput";

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(3),
    email: z.string().email().min(5),
    confirmPassword: z.string().min(5),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Indica en qué campo mostrar el error
    message: "Passwords must match",
  });
export const RegisterPage = () => {
  const navigate = useNavigate();
  const { refreshToken } = useAuthStore();
  const authStatus = useAuthStore().authStatus;

  const [isLoading, setIsLoading] = useState(false);
  // 1 - define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
 /*  const responseMessage = async (response: any) => {
    console.log(response);
    //* response.credential is the google key to send to server
    setIsLoading(true);
    const loginWithGoogle = await postAction<UserAuth>("auth/google-signIn", {
      googleToken: response.credential,
      idDevice: "123456-google",
    });
    setIsLoading(false);
    if (validateStatus(loginWithGoogle!.status)) {
      window.localStorage.setItem("token", loginWithGoogle!.data!.accessToken);
      await refreshToken();
      toast.success("Login success", { duration: 2500, position: "top-right" });
      return;
    }
  }
  const errorMessage = (error: any) => {
    console.log(error);
  }; */

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    const getUserLogging = await postAction<UserAuth>("auth/signup", {
      username: values.username,
      password: values.password,
      passwordConfirm: values.confirmPassword,
      email: values.email,
    });
    console.log(values);
    setIsLoading(false);
    if (validateStatus(getUserLogging!.status)) {
      window.localStorage.setItem("token", getUserLogging!.data!.accessToken);
      await refreshToken();
      toast.success("Login success", { duration: 2500, position: "top-right" });
      return;
    }
    toast.error("Error al crear ciemta", {
      duration: 2500,
      position: "bottom-center",
    });
  }
  useEffect(() => {
    console.log(authStatus);
    if (authStatus == AuthStatus.AUTHENTICATED) {
      navigate("/panel-administrativo");
    }
  }, [authStatus]);

  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-gray-200'>
        {/* Contenedor del formulario */}
        <div className='w-full max-w-2xl bg-white shadow-lg rounded-lg p-8'>
          <div className='flex flex-col items-center justify-center'>
            {/* Imagen del logo */}
            <img alt='' src='./logo_butter_fly.png' className='h-16 w-auto' />
            {/* Título */}
            <h2 className='mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center'>
              Bienvenido de nuevo!
            </h2>
            <label
              htmlFor=''
              className='mt-2 text-sm font-normal leading-5 text-gray-600 text-center'
            >
              Crear una cuenta
            </label>
          </div>

          {/* Formulario */}
          <div className='mt-10'>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormCustomInput
                  isLoading={isLoading}
                  control={form.control}
                  fieldName='username'
                  label='Nombre de usuario'
                  placeholder='Nombre de usuario'
                />
                <FormCustomInput
                  isLoading={isLoading}
                  control={form.control}
                  fieldName='email'
                  label='Correo electrónico'
                  placeholder='Correo electrónico'
                />
                <FormCustomInput
                  isLoading={isLoading}
                  control={form.control}
                  fieldName='password'
                  label='Contraseña'
                  placeholder='Contraseña'
                />
                <FormCustomInput
                  isLoading={isLoading}
                  control={form.control}
                  fieldName='confirmPassword'
                  label='Confirmar contraseña'
                  placeholder='Repetir contraseña'
                />

                {/* Botón de envío */}
                <Button
                  className='flex w-full justify-center rounded-full bg-primary px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                  disabled={isLoading}
                  type='submit'
                >
                  Registrarse
                </Button>

                {/* Google Login */}
                {/* <GoogleLogin
                  onSuccess={responseMessage}
                  onError={(error) => errorMessage(error)}
                /> */}

                {/* Link para iniciar sesión */}
                <LabelTitleSubTitleClickable
                  onClick={() => navigate("/ingreso")}
                  text='¿Ya tienes cuenta?'
                  subtitle='Iniciar sesión'
                  spacer='mt-4'
                />
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
};
