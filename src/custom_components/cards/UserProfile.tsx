import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Globe,
} from 'lucide-react'

import { convertDate } from '@/utils/dates'
import useAxiosQueryAuth, {
  useAxiosMultiQueryAuth,
} from '@/hooks/useAuthAxiosQuery'

import {
  Student,
  UserStudentDetail,
} from '@/pages/dashboard/interfaces/students.interface'
import { Skeleton } from '@/components/ui/skeleton'
import { RolesInterface } from '@/interfaces/auth.interface'
import { isValidString } from '@/utils/validation/validation'
import { capitalizeString } from '../../utils/utils'
import { EditUserProfile } from './EditUserProfile'
import { BecomeProfessor } from '@/pages/dashboard/BecomeProfessor'
import { useInformationStore } from '@/store/useInformationStore'
import { ContentRawInformation } from './RawInfomation'

interface UserDialogProfileProps {
  studentDetail?: UserStudentDetail
  onReload?: () => void
}
export const UserDialogProfile = ({
  studentDetail,
  onReload,
}: UserDialogProfileProps) => {
  /*  const { studentDetail, isLoading } = useAxiosQueryAuth<UserStudentDetail>({
    url: `/students/user-student-info/${idStudent}`,
    method: 'GET',
  }) */

  const { changeExtraInformation } = useInformationStore()
  const { changeDialogInformation } = useInformationStore()

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={studentDetail?.profileImageUrl}
            alt="Foto del usuario"
          />
          <AvatarFallback>
            <User className="h-10 w-10" />
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>
            {studentDetail?.firstName} {studentDetail?.lastName}
          </CardTitle>
          <CardDescription>{studentDetail?.username}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="">
        <ContentRawInformation
          label="Correo electrónico"
          value={studentDetail?.email}
          icon={<Mail className="h-4 w-4 text-muted-foreground" />}
        />
        <ContentRawInformation
          label="Telefono"
          value={studentDetail?.phone}
          icon={<Phone className="h-4 w-4 text-muted-foreground" />}
        />
        <ContentRawInformation
          label="Direccion"
          value={studentDetail?.address}
          icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
        />

        <ContentRawInformation
          label="Trabajo"
          value={
            'Miembro desde: ' + convertDate(studentDetail?.createdAt, 'LLLL')
          }
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        />
        {/* <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span>www.anamartinez.com</span>
      </div> */}
        {/* <div className="flex flex-wrap gap-2">
        <Badge>UX Design</Badge>
        <Badge>UI Design</Badge>
        <Badge>Prototyping</Badge>
        <Badge>User Research</Badge>
      </div> */}

        {studentDetail?.roles?.map((role) => (
          <Badge className="mx-1" key={role.id}>
            {capitalizeString(role.name)}
          </Badge>
        ))}
      </CardContent>
      <CardFooter className="">
        <Button
          onClick={() =>
            changeExtraInformation({
              isOpen: true,
              title: 'Editar Perfil',
              content: (
                <EditUserProfile
                  userInfo={studentDetail}
                  onReload={onReload}
                />
              ),
            })
          }
        >
          Editar Perfil
        </Button>
        {/* <Button
          onClick={() =>
            changeDialogInformation({
              isDialogOpen: true,
              title: 'Convertirse en profesor',
              subtitle: '¿Estás seguro de que deseas convertirte en profesor?',
              content: <BecomeProfessor userStudent={studentDetail} />,
            })
          }
        >
          Convertir en profesor
        </Button> */}
      </CardFooter>
    </Card>
  )
}
