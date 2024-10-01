import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { User } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { FormCustomField } from '@/custom_components/forms/react-form-hooks/FormCustomField'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserStudentDetail } from './interfaces/students.interface'
import { postAction } from '@/provider/action/ActionAuthorization'
import { isValidStatus } from '@/utils/validation/validation'
import { toast } from 'sonner'

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
}
export const BecomeProfessor = ({ userStudent }: BecomeProfessorProps) => {
  const { changeDialogInformation } = useInformationStore()
  const { changeExtraInformation } = useInformationStore()

  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof professorSchema>>({
    resolver: zodResolver(professorSchema),
    defaultValues: {
      professionalTitle: '',
      expertise: '',
      idUser: userStudent?.id,
    },
  })
  const handleSubmit = async (values) => {
    setIsLoading(true)
    const res = await postAction('/professor', {
      ...values,
    })
    setIsLoading(false)
    if (isValidStatus(res.status)) {
      console.log('Profesor')
      toast.success(
        `Usuario ${userStudent?.firstName} Se ha convertido en profesor`,
      )
      changeDialogInformation({
        isDialogOpen: false,
        title: '',
        content: <></>,
      })
      changeExtraInformation(<></>)
      return
    }

    toast.error('Error al convertir en profesor')
  }
  return (
    <>
      <UserProfileRawInfo user={userStudent} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <FormCustomField
            isLoading={isLoading}
            control={form.control}
            fieldName="professionalTitle"
            label="Titulo profesional"
            placeholder="Titulo profesional"
          />
          <FormCustomField
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
