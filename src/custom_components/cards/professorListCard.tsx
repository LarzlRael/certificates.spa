'use client'

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
import { BookOpenIcon, GraduationCapIcon, SearchIcon } from 'lucide-react'
import { ProfessorInterface } from '@/pages/dashboard/interfaces/professors.interface'

// Simulated professor data
/* const professors = [
  { id: 1, name: "Dr. Ana García", subject: "Matemáticas", email: "ana.garcia@universidad.edu" },
  { id: 2, name: "Prof. Carlos Rodríguez", subject: "Historia", email: "carlos.rodriguez@universidad.edu" },
  { id: 3, name: "Dra. Laura Martínez", subject: "Biología", email: "laura.martinez@universidad.edu" },
  { id: 4, name: "Dr. Javier López", subject: "Física", email: "javier.lopez@universidad.edu" },
] */
interface ProfessorListCardProps {
  professorList: ProfessorInterface[]
}
export const ProfessorsListCard = ({
  professorList,
}: ProfessorListCardProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  /* const filteredProfessors = professorList.filter((professor) =>
    professor.user!.username.toLowerCase().includes(searchTerm.toLowerCase()),
  ) */

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
        {professorList.map(({ user,...rest }) => (
          <Card key={user.id} className="flex flex-col">
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
                    {rest.professionalTitle} {user.firstName} {user.lastName}
                  </CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <GraduationCapIcon className="w-4 h-4" />
                <span>{user.createdAt}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
                <BookOpenIcon className="w-4 h-4" />
                <span>{rest.expertise}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Contactar</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
