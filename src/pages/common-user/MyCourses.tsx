import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronRight, Clock } from 'lucide-react'
import {
  EnrollmentByUser,
  mapEnrollment,
} from '@/interfaces/enrollment.interface'
import { useNavigate } from 'react-router-dom'

// Tipo para representar un curso

interface CoursesByUser {
  courses: EnrollmentByUser[]
}

export const CoursesByUser = ({ courses }: CoursesByUser) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lista de Cursos Disponibles</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseListTile oneCourse={course} />
        ))}
      </div>
    </div>
  )
}

interface CourseListTileProps {
  oneCourse: EnrollmentByUser
}
export const CourseListTile = ({ oneCourse }: CourseListTileProps) => {
  const navigation = useNavigate()
  const { courseName, courseDescription, imageUrl } = mapEnrollment(oneCourse)
  return (
    <Card
      key="1"
      className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
    >
      <div className="flex-shrink-0">
        <img
          src={imageUrl ?? 'https://via.placeholder.com/150'}
          /* alt={`Imagen de ${curso.titulo}`} */

          className="rounded-md shadow-md w-20 h-20"
        />
      </div>
      <div className="flex-grow">
        <h2 className="text-xl font-semibold text-gray-800">{courseName}</h2>
        <p className="text-sm text-gray-600 mt-1">{courseDescription}</p>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span>duration</span>
        </div>
      </div>
      <div className="flex-shrink-0">
        <Button className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark transition-colors duration-200">
          Completar plago
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}
