import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { User } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

import { z } from 'zod'
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  FormCustomInput,
  FormCustomArea,
  GlobalFormHook,
} from '@/custom_components/forms/react-form-hooks/'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserStudentDetail } from './interfaces/students.interface'
import { isValidStatus, isValidString } from '@/utils/validation/validation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

import { postAction, putAuthAction } from '@/provider/action/ActionAuthorization'
import { useInformationStore } from '@/store/useInformationStore'
import { addOrEditProfessor } from '@/custom_components/data/form-pattens'

const professorSchema = z.object({
  professionalTitle: z.string().min(2, {
    message: 'Debe tener al menos 2 caracteres.',
  }),
  phone: z
    .string()
    .min(8, {
      message: 'Debe tener al menos 3 caracteres.',
    })
    .optional(),
  fullName: z
    .string()
    .min(8, {
      message: 'Debe tener al menos 3 caracteres.',
    })
    .optional(),
  description: z.string().min(3, {}).optional(),
})
interface BecomeProfessorProps {
  userStudent: UserStudentDetail | undefined
  professionalTitle?: string | undefined
  expertise?: string | undefined
}
export const BecomeProfessor = () => {
  const { changeDialogInformation } = useInformationStore()
  const { changeExtraInformation } = useInformationStore()
  const { clearExtraInformation } = useInformationStore()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof professorSchema>>({
    resolver: zodResolver(professorSchema),
    defaultValues: {
      professionalTitle: '',
      phone: '',
      fullName: '',
      description: '',
    },
  })

  const onUpdateInformation = async (values): boolean => {
    setIsLoading(true)
    const res = await putAuthAction('/professor', {
      ...values,
    })
    setIsLoading(false)
    return isValidStatus(res.status)
  }
  const onCreateInformation = async (values): boolean => {
    setIsLoading(true)
    const res = await postAction('/professor', {
      ...values,
    })
    setIsLoading(false)
    return isValidStatus(res.status)
  }

  const handleSubmit = async (values) => {
    console.log(values)
    const isCreating = professionalTitle != null || expertise != null
    const res = isCreating
      ? await onUpdateInformation(values)
      : await onCreateInformation(values)

    if (res) {
      changeDialogInformation({
        isOpen: false,
        title: '',
        subtitle: '',
        content: null,
      })
      clearExtraInformation()
      toast.success('Se ha actualizado la información correctamente')
    } else {
      toast.error('Ha ocurrido un error al actualizar la información')
    }
  }

  return (
    <>
      {/* <UserProfileRawInfo user={userStudent} /> */}
      <GlobalFormHook
        inputJson={addOrEditProfessor}
        onSubmit={handleSubmit}
        formTitle="Editar información de Perfil"
        isLoading={false}
        schema={professorSchema}
        titleButton="Guardar cambios"
      />
    </>
  )
}

interface UserProfileRawInfoProps {
  user: UserStudentDetail | undefined
}
const UserProfileRawInfo = ({ user }: UserProfileRawInfoProps) => {
  console.log(user)
  return (
    <CardHeader>
      <div className="flex items-center space-x-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user.profileImageUrl} />
          <AvatarFallback>
            {user.username
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>
            {user.professionalTitle} {user.firstName} {user.lastName}
          </CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </div>
      </div>
    </CardHeader>
  )
}
