import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  BookOpenIcon,
  Edit,
  GraduationCapIcon,
  MoreVertical,
  SearchIcon,
  Trash2,
} from 'lucide-react'
import { ProfessorI } from '@/pages/dashboard/interfaces/professors.interface'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { convertDate } from '@/utils/dates'

interface ProfessorListCardProps {
  professorList: ProfessorI[]
  onEdit: (selectProfessor: ProfessorI) => void
}

export const ProfessorsListCard = ({
  professorList,
  onEdit,
}: ProfessorListCardProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Directorio de Profesores
      </h1>
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Buscar por nombre o asignatura..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professorList.map((user) => (
          <OneProfessorCard key={user.id} user={user} onEdit={onEdit} />
        ))}
      </div>
    </div>
  )
}

interface OneProfessorCardProps {
  user: ProfessorI
  onEdit: (selectProfessor: ProfessorI) => void
}

export const OneProfessorCard = ({ user, onEdit }: OneProfessorCardProps) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user.profileImageUrl} />
            <AvatarFallback>
              {user.fullName
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>
              {user.professionalTitle} {user.fullName}
            </CardTitle>
            <CardDescription>{user.phone}</CardDescription>
          </div>
        </div>
        {/* Dropdown start */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(user)}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Dropdown end */}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <GraduationCapIcon className="w-4 h-4" />
          <span>
            Profesor desde
            <br /> {convertDate(user.createdAt, 'LLLL')}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
          <BookOpenIcon className="w-4 h-4" />
          <span>{user.description}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Contactar</Button>
      </CardFooter>
    </Card>
  )
}
