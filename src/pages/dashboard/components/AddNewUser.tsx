import { addNewUser } from '@/custom_components/data/form-pattens'
import { GlobalFormHook } from '@/custom_components/forms/react-form-hooks/GlobalFormHook'
import { postAuthAction } from '@/provider/action/ActionAuthorization'
import { useInformationStore } from '@/store/useInformationStore'
import { isValidStatus } from '@/utils/validation/validation'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

const addNewUserSchema = z.object({
  dni: z
    .string()
    .min(6, {
      message: 'El DNI debe tener al menos 8 caracteres.',
    })
    .max(12, {
      message: 'El DNI no puede exceder los 12 caracteres.',
    })
    .regex(/^[0-9]+$/, {
      message: 'El DNI solo puede contener números.',
    }),

  dateBirth: z.date(),

  phone: z
    .string()
    .min(8, {
      message: 'El teléfono debe tener al menos 8 dígitos.',
    })
    .regex(/^[0-9]+$/, {
      message: 'El teléfono solo puede contener números.',
    }),

  firstName: z
    .string()
    .min(1, { message: 'El nombre no puede estar vacío.' })
    .max(50, {
      message: 'El nombre no puede exceder los 50 caracteres.',
    }),

  lastName: z
    .string()
    .min(1, { message: 'El apellido no puede estar vacío.' })
    .max(50, {
      message: 'El apellido no puede exceder los 50 caracteres.',
    }),
})

interface AddNewUserProps {
  onReload?: () => void
}
export const AddNewUser = ({ onReload }: AddNewUserProps) => {
  const { clearDialogInformation } = useInformationStore()
  const [isLoading, setIsLoading] = useState(false)


  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const res = await postAuthAction('/auth/register-user-by-admin', values)

      setIsLoading(false)
      if (!isValidStatus(res.status)) {
        toast.error('Error al añadir el usuario')
        return
      }
      if (onReload) onReload()
      clearDialogInformation()
      toast.success('Usuario añadido correctamente')
    } catch (error) {
      console.error('Error :', error)
      setIsLoading(false)
    }
  }
  
  return (
    <GlobalFormHook
      inputJson={addNewUser}
      isLoading={isLoading}
      titleButton="Guardar"
      onSubmit={handleSubmit}
      formTitle="Añadir usuario"
      schema={addNewUserSchema}
    />
  )
}
