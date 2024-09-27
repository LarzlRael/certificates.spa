import { CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { LatestUpdatesInterface } from '@/pages/dashboard/interfaces/dashboard.interfaces'
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const goToDetails = (type: string, idToGo: number): string => {
  const dashboardName = '/panel-administrativo'
  switch (type) {
    case 'course':
      return `${dashboardName}/cursos/${idToGo}`
    case 'student':
      return `${dashboardName}/estudiante/${idToGo}`
    case 'payment':
      return `${dashboardName}/pago/${idToGo}`
    case 'enrollment':
      return `${dashboardName}/enrollments/${idToGo}`
    default:
      return '/dashboard'
  }
}

interface LastUpdatedInterfaceProps {
  listElements: LatestUpdatesInterface[]
}
interface LatestUpdateCardProps {
  element: LatestUpdatesInterface
  onClick?: () => void
}
export const LatestUpdateCards = ({
  listElements,
}: LastUpdatedInterfaceProps) => {
  const navigate = useNavigate()
  return (
    <CardContent>
      <ul className="space-y-4">
        {listElements!.map((element) => (
          <LatestUpdateCard
            element={element}
            onClick={() => navigate(goToDetails(element.type, element.id))}
            key={element.id}
          />
        ))}
      </ul>
    </CardContent>
  )
}

const labelType = {
  course: 'Nuevo curso registrado',
  student: 'Nuevo estudiante registrado',
  payment: 'Nuevo pago registrado',
  enrollment: 'Nueva inscripción registrada',
}

export const LatestUpdateCard = ({
  element,
  onClick,
}: LatestUpdateCardProps) => {
  return (
    <li
      onClick={onClick}
      key={element.id}
      className="bg-gray-50 p-3 rounded-lg cursor-pointer"
    >
      <p className="font-medium">{labelType[element.type]}</p>
      <p className="text-sm text-gray-600">{element.description}</p>
      <p className="text-xs text-gray-500 mt-1">
        {formatDistanceToNow(element.date, { addSuffix: true })}
      </p>
    </li>
  )
}

const LatestUpdateSkeletonCard = () => {
  return (
    <li className="bg-gray-50 p-3 rounded-lg">
      <Skeleton className="h-5 w-1/4 mb-2" /> {/* Simula el título */}
      <Skeleton className="h-4 w-3/4 mb-2" /> {/* Simula la descripción */}
      <Skeleton className="h-3 w-1/2" /> {/* Simula la fecha */}
    </li>
  )
}

export const LatestUpdateListSkeleton = () => {
  return (
    <CardContent>
      <ul className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <LatestUpdateSkeletonCard key={index} />
        ))}
      </ul>
    </CardContent>
  )
}
