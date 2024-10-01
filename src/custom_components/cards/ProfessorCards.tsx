import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ProfessorInterface } from '@/pages/dashboard/interfaces/professors.interface'
import { FormLabel } from '@/components/ui/form'
/* import { Badge } from '@/components/ui/badge' */

interface ProfessorsProps {
  professorsList: ProfessorInterface[] | undefined
  selectProfessors: (id: number[]) => void
}

export default function ProfessorsCard({
  professorsList,
  selectProfessors,
}: ProfessorsProps) {
  const [selected, isSelected] = useState<number[]>([])
  const [filter, setFilter] = useState<string>('')

  const toggleSelection = (id: number) => {
    isSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
    /* selectProfessors(selected) */
  }
  useEffect(() => {
    selectProfessors(selected) // Llama a la función `selectProfessors` con el estado actualizado
  }, [selected, selectProfessors])

  const filteredProfessors = professorsList.filter(
    (prof) =>
      prof.professionalTitle.toLowerCase().includes(filter.toLowerCase()) ||
      prof.username.toLowerCase().includes(filter.toLowerCase()) ||
      (prof.firstName?.toLowerCase() ?? '').includes(
        filter.toLowerCase(),
      ) || // Maneja null
      (prof.lastName?.toLowerCase() ?? '').includes(
        filter.toLowerCase(),
      ) || // Maneja null
      prof.expertise.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <>
      <FormLabel className="block text-sm font-medium leading-6 text-gray-900 text-left">
        Profesores
      </FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Seleccionar profesores</Button>
        </PopoverTrigger>
        <PopoverContent className="w-100">
          <div className="container mx-auto p-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar profesores..."
                className="w-full p-2 border rounded"
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProfessors.map((profesor) => (
                <Card key={profesor.idProfessor} className="flex flex-col">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <Avatar className="h-16 w-16 mr-4">
                      <AvatarImage
                        src={profesor.profileImageUrl}
                        alt={`Foto de ${profesor.username}`}
                      />
                      <AvatarFallback>
                        {profesor.username
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-medium">
                        {profesor.professionalTitle} {profesor.firstName}{' '}
                        {profesor.lastName}
                      </CardTitle>
                      {/*   <CardDescription className="text-sm text-muted-foreground">
                  {profesor.expertise}
                </CardDescription> */}
                    </div>
                    <Checkbox
                      id={`select-${profesor.idProfessor}`}
                      checked={selected.includes(profesor.idProfessor)}
                      onCheckedChange={() =>
                        toggleSelection(profesor.idProfessor)
                      }
                    />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">
                      Experiencia: {profesor.expertise}
                    </p>
                    {/* <div className="flex flex-wrap gap-1">
                {profesor.especialidades.map((esp, index) => (
                  <Badge key={index} variant="secondary">
                    {esp}
                  </Badge>
                ))}
              </div> */}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-4">
              <Button
                onClick={() =>
                  console.log('Profesores seleccionados:', selected)
                }
                disabled={selected.length === 0}
              >
                Contactar Seleccionados ({selected.length})
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

interface ProfessorsPropsMini {
  professorsList: ProfessorInterface[]
  selectProfessors: (professors: ProfessorInterface[]) => void
}

export const ProfessorCardMini = ({
  professorsList,
  selectProfessors,
}: ProfessorsPropsMini) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
      {professorsList.map((profesor) => (
        <Card key={profesor.id} className="relative">
          {/* button */}
          <CardContent className="flex flex-col items-center p-4">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage
                src={profesor.user.profileImageUrl || undefined}
                alt={`${profesor.user.firstName} ${profesor.user.lastName}`}
              />
              <AvatarFallback>{`${profesor.user.firstName?.[0] || ''}${
                profesor.user.lastName?.[0] || ''
              }`}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-medium text-sm">{`${profesor.professionalTitle} ${profesor.user.firstName} ${profesor.user.lastName}`}</p>
              {/* <p className="text-xs text-muted-foreground">
                {profesor.expertise}
              </p> */}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

{
  /* <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6"
             onClick={() => eliminarProfesor(profesor.id)} 
            aria-label={`Eliminar a ${profesor.user.firstName} ${profesor.user.lastName}`}
          >
            <X className="h-4 w-4" /> 
          </Button> */
}
