import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ProfessorI } from "@/pages/dashboard/interfaces/professors.interface";
import { FormLabel } from "@/components/ui/form";
import { isValidArray } from "@/utils/validation/validation";

interface ProfessorsProps {
  professorsList: ProfessorI[] | undefined;
  selectProfessors: (id: number[]) => void;
}

export default function ProfessorsCard({
  professorsList,
  selectProfessors,
}: ProfessorsProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [filter, setFilter] = useState<string>("");

  const toggleSelection = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Este efecto solo se ejecutará cuando selected cambie
  useEffect(() => {
    selectProfessors(selected);
  }, [selected]);

  const filteredProfessors = professorsList.filter(
    (prof) =>
      prof.professionalTitle.toLowerCase().includes(filter.toLowerCase()) ||
      prof.fullName.toLowerCase().includes(filter.toLowerCase()) ||
      prof.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <FormLabel className='block text-sm font-medium leading-6 text-gray-900 text-left'>
        Profesores
      </FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline'>Seleccionar profesores</Button>
        </PopoverTrigger>
        <PopoverContent className='w-100'>
          <div className='container mx-auto p-4'>
            <div className='mb-4'>
              <input
                type='text'
                placeholder='Buscar profesores...'
                className='w-full p-2 border rounded'
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4'>
              {filteredProfessors.map((professor) => (
                <Card
                  className={`flex flex-col cursor-pointer ${
                    selected.includes(professor.id)
                      ? "bg-blue-100"
                      : "hover:bg-blue-50"
                  }`}
                  onClick={() => toggleSelection(professor.id)}
                  key={professor.id}
                >
                  <CardHeader className='flex flex-row items-center space-y-0 pb-2'>
                    <Avatar className='h-16 w-16 mr-4'>
                      <AvatarImage
                        src={professor.profileImageUrl}
                        alt={`Foto de ${professor.fullName}`}
                      />
                      <AvatarFallback>
                        {professor.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <CardTitle className='text-lg font-medium'>
                        {professor.professionalTitle} {professor.fullName}
                      </CardTitle>
                    </div>
                    {/* <Checkbox
                      id={`select-${profesor.idProfessor}`}
                      checked={selected.includes(profesor.idProfessor)}
                      onCheckedChange={() =>
                        toggleSelection(profesor.idProfessor)
                      }
                    /> */}
                  </CardHeader>
                </Card>
              ))}
            </div>
            {isValidArray(selected) && (
              <span>Profesores seleccionados: {selected.length}</span>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

interface ProfessorsPropsMini {
  professorsList: ProfessorI[];
  selectProfessors: (professors: ProfessorI[]) => void;
}

// Componente mini para mostrar profesores seleccionados
export const ProfessorCardMini = ({
  professorsList,
  selectProfessors,
}: ProfessorsPropsMini) => {
  
  return (
    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 '>
      {professorsList.map((profesor) => (
        <Card key={profesor.id} className='relative'>
          <CardContent className='flex flex-col items-center p-4'>
            <Avatar className='h-16 w-16 mb-2'>
              <AvatarImage
                src={profesor.profileImageUrl || undefined}
                alt={profesor.fullName}
              />
              <AvatarFallback>{`${profesor.fullName[0]}${profesor.fullName[1]}`}</AvatarFallback>
            </Avatar>
            <div className='text-center'>
              <p className='font-medium text-sm'>{`${profesor.professionalTitle} ${profesor.fullName}`}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
