import {
  CourseInfoInterface,
  CoursesDetailModel,
} from "@/pages/dashboard/interfaces/course.interface";
import { isValidArray } from "@/utils/validation/validation";
import { toCapitalize } from "@/utils/text-utils";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  MoreVertical,
  Search,
  BookOpen,
  Users,
  Edit,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const CourseCard = ({
  courseName,
  courseDescription,
  imageUrl,
  professors,
}: CoursesDetailModel) => {
  return (
    <>
      <div
        className='h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden'
        style={{
          backgroundImage: `url(${
            imageUrl ?? "https://source.unsplash.com/random"
          })`,
        }}
        title='Woman holding a mug'
      ></div>
      <div className='border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
        <div className='mb-8'>
          <p className='text-sm text-gray-600 flex items-center'>
            <svg
              className='fill-current text-gray-500 w-3 h-3 mr-2'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z' />
            </svg>
            Members only
          </p>
          <div className='text-gray-900 font-bold text-xl mb-2'>
            {toCapitalize(courseName)}
          </div>
          <p className='text-gray-700 text-base'>{courseDescription}</p>
        </div>
        <div className='flex items-center'>
          {!isValidArray(professors)
            ? null
            : professors.map((professor) => (
                <>
                  <img
                    className='w-10 h-10 rounded-full mr-4'
                    src={
                      imageUrl ??
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9gUXKwt2KErC_jWWlkZkGabxpeGchT-fyw&s"
                    }
                    alt={courseName}
                  />
                  <div className='text-sm'>
                    <p className='text-gray-900 leading-none'>
                      {professor.user?.firstName}
                      {professor.user?.lastName}
                    </p>
                    <p className='text-gray-600'>
                      {professor?.professionalTitle}
                    </p>
                  </div>
                </>
              ))}
        </div>
      </div>
    </>
  );
};

interface CourseListProps {
  courseInfo: CourseInfoInterface[];
  onClick: (idCourse: number) => void;
  onEdit: (idCourse: number) => void;
}

export const CourseList = ({
  courseInfo,
  onClick,
  onEdit,
}: CourseListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  /* const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
  ) */

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-6'>
        <div className='relative w-64'>
          <Input
            type='text'
            placeholder='Buscar cursos...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {courseInfo.map((course) => (
          <Card key={course.id} className='flex flex-col'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {course.courseName}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='h-8 w-8 p-0'>
                    <span className='sr-only'>Abrir menú</span>
                    <MoreVertical className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onEdit(course.id)}>
                    <Edit className='mr-2 h-4 w-4' />
                    <span>Editar</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash2 className='mr-2 h-4 w-4' />
                    <span>Eliminar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className='flex items-center space-x-4 mb-2'>
                {course.professors.map((professor, index) => (
                  <div
                    className='flex flex-col space-y-2'
                    key={`${index}-${professor.id}`}
                  >
                    {/* /* Validad this metod null values*/}
                    <Avatar className='h-8 w-8'>
                      <AvatarImage src={professor.profileImageUrl} />
                      <AvatarFallback>
                        {professor.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium leading-none'>
                        {professor.professionalTitle} {professor.fullName}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Instructor
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex justify-between text-sm text-muted-foreground'>
                <div className='flex items-center'>
                  <Users className='mr-1 h-4 w-4' />
                  {course.formCount} estudiantes
                </div>
                {/* <div className='flex items-center'>
                  <Clock className='mr-1 h-4 w-4' />
                  {course.duration}
                </div> */}
              </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
              {/*  <Badge
                variant={
                  course.status === "Activo"
                    ? "default"
                    : course.status === "Inactivo"
                    ? "secondary"
                    : "outline"
                }
              >
                {course.status}
              </Badge> */}
              <Button
                onClick={() => onClick(course.id)}
                variant='outline'
                size='sm'
              >
                <BookOpen className='mr-2 h-4 w-4' />
                Ver Detalles
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
