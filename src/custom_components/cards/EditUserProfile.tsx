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
import { GlobalForm } from '../forms/form-formik/GlobalForm'
import { storeAddOrEditForm } from '../data/form-pattens'

interface EditUserProfileProps {
  idStudent?: number
}
export const EditUserProfile = () => {
  return (
    <GlobalForm
      inputJson={storeAddOrEditForm}
      onSubmit={(values) => {
        console.log(values)
      }}
      formTitle="Editar información de Perfil"
      loading={false}
      titleButton="Editar información"
    />
  )
}

interface UserProfileRawInfoProps {
  value?: string | undefined | null
  icon?: any
}
export const UserProfileRawInfo = ({
  value,
  icon,
}: UserProfileRawInfoProps) => {
  if (!isValidString(value)) return <div></div>
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{value}</span>
    </div>
  )
}
