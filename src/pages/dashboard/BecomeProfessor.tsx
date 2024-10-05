import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { User } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

import { z } from 'zod'
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  FormCustomInput,
  FormCustomArea,
} from '@/custom_components/forms/react-form-hooks/'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserStudentDetail } from './interfaces/students.interface'
import { isValidStatus, isValidString } from '@/utils/validation/validation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

import { postAction, putAction } from '@/provider/action/ActionAuthorization'
import { useInformationStore } from '@/store/useInformationStore'

const professorSchema = z.object({
  professionalTitle: z.string().min(2, {
    message: 'Debe tener al menos 2 caracteres.',
  }),
  expertise: z.string().min(5),
  idUser: z.number().positive(),
})
interface BecomeProfessorProps {
  userStudent: UserStudentDetail | undefined
  professionalTitle?: string | undefined
  expertise?: string | undefined
}
export const BecomeProfessor = () => {
  const { changeDialogInformation } = useInformationStore()
  const { changeExtraInformation } = useInformationStore()

  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof professorSchema>>({
    resolver: zodResolver(professorSchema),
    defaultValues: {
      professionalTitle:'',
      expertise: '',
      idUser: 0,
    },
  })

  const onUpdateInformation = async (values): boolean => {
    setIsLoading(true)
    const res = await putAction('/professor', {
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
        isDialogOpen: false,
        title: '',
        subtitle: '',
        content: null,
      })
      changeExtraInformation(null)
      toast.success('Se ha actualizado la información correctamente')
    } else {
      toast.error('Ha ocurrido un error al actualizar la información')
    }
  }
  return (
    <>
      {/* <UserProfileRawInfo user={userStudent} /> */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <FormCustomInput
            isLoading={isLoading}
            control={form.control}
            fieldName="professionalTitle"
            label="Titulo profesional"
            placeholder="Titulo profesional"
          />
          <FormCustomArea
            isLoading={isLoading}
            control={form.control}
            fieldName="expertise"
            label="Especialidad"
            placeholder="Especialidad"
          />

          <Button
            className="flex w-full justify-center rounded-full bg-primary px-3 py-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
            disabled={isLoading}
            type="submit"
          >
            Convertir en profesor
          </Button>
        </form>
      </FormProvider>
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
