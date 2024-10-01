import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { FormCustomField } from '@/custom_components/forms/react-form-hooks/FormCustomField'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { User } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { UserStudentDetail } from './interfaces/students.interface'

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
  const form = useForm<z.infer<typeof professorSchema>>({
    resolver: zodResolver(professorSchema),
    defaultValues: {
      professionalTitle: '',
      expertise: '',
      idUser: 0,
    },
  })
  const handleSubmit = (values) => {}
  return (
    <>
      <UserProfileRawInfo user={userStudent} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <FormCustomField
            isLoading={false}
            control={form.control}
            fieldName="professionalTitle"
            label="Titulo profesional"
            placeholder="Titulo profesional"
          />
          <FormCustomField
            isLoading={false}
            control={form.control}
            fieldName="expertise"
            label="Especialidad"
            placeholder="Especialidad"
          />

          <Button
            className="flex w-full justify-center rounded-full bg-primary px-3 py-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
            disabled={false}
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
    <CardHeader className="flex flex-row items-center gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={user?.profileImageUrl} alt="Foto del usuario" />
        <AvatarFallback>
          <User className="h-10 w-10" />
        </AvatarFallback>
      </Avatar>
      <div>
        <CardTitle>
          {user?.firstName} {user?.lastName}
        </CardTitle>
        <CardDescription>{user?.username}</CardDescription>
      </div>
    </CardHeader>
  )
}
