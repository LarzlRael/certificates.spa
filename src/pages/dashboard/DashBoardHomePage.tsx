import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import UserCardMini from '@/custom_components/cards/UserCard'
import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'
import { useThemeStore } from '@/store/themeStore'
import { isValidArray } from '@/utils/validation/validation'
import {
  User,
  Book,
  FileText,
  Users,
  GraduationCap,
  DollarSign,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Student } from './interfaces/enrollment-by-course-interface'
import { DashBoardInitialInterface } from './interfaces/course.interface'
import { Skeleton } from '@/components/ui/skeleton'
import { InfoCardsSkeleton } from '@/custom_components/cards/Dashboards'

const generalStatistics = (dashBoarData: DashBoardInitialInterface) => {
  return [
    {
      titulo: 'Total Estudiantes',
      icono: Users,
      color: 'text-blue-500',
      valor: dashBoarData.users,
    },
    {
      titulo: 'Cursos Activos',
      icono: Book,
      color: 'text-green-500',
      valor: dashBoarData.courses,
    },
    {
      titulo: 'Profesores',
      icono: GraduationCap,
      color: 'text-purple-500',
      valor: dashBoarData.professors,
    },
    {
      titulo: 'Ingresos Mensuales',
      icono: DollarSign,
      color: 'text-yellow-500',
      valor: '$52,489',
    },
  ]
}

const actividadReciente = [
  {
    id: 1,
    accion: 'Nuevo estudiante registrado',
    detalles: 'María López se unió a la plataforma',
    tiempo: 'Hace 5 minutos',
  },
  {
    id: 2,
    accion: 'Curso creado',
    detalles: 'Introducción a la Inteligencia Artificial',
    tiempo: 'Hace 1 hora',
  },
  {
    id: 3,
    accion: 'Pago recibido',
    detalles: 'Juan Pérez pagó por el curso de Desarrollo Web',
    tiempo: 'Hace 2 horas',
  },
]

const datosInscripciones = [
  { mes: 'Ene', inscripciones: 65 },
  { mes: 'Feb', inscripciones: 59 },
  { mes: 'Mar', inscripciones: 80 },
  { mes: 'Abr', inscripciones: 81 },
  { mes: 'May', inscripciones: 56 },
  { mes: 'Jun', inscripciones: 55 },
  { mes: 'Jul', inscripciones: 40 },
]

const notificaciones = [
  {
    id: 1,
    titulo: 'Nuevo mensaje',
    contenido: 'Tienes un nuevo mensaje del equipo de soporte.',
    tiempo: 'Hace 10 minutos',
  },
  {
    id: 2,
    titulo: 'Actualización del sistema',
    contenido: 'Se ha programado una actualización para mañana a las 02:00 AM.',
    tiempo: 'Hace 1 hora',
  },
  {
    id: 3,
    titulo: 'Recordatorio',
    contenido: 'Reunión de equipo a las 15:00.',
    tiempo: 'Hace 2 horas',
  },
]

export const DashBoardHomePage = () => {
  const navigate = useNavigate()
  const { changeInformationInfo } = useThemeStore()
  const { data, isLoading, error, reload } = useAxiosQueryAuth<Student[]>({
    url: `/students/find-students`,
    method: 'GET',
  })

  const {
    data: dataInitialInfo,
    isLoading: isLoadingInitialInfo,
  } = useAxiosQueryAuth<DashBoardInitialInterface>({
    url: `/users/get-dash-board-initial-info`,
    method: 'GET',
  })

  const handOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value
    if (e.target.value === '') {
      changeInformationInfo(<></>)
      return
    }
    const filteredData = data.filter((student) => {
      return (
        student.user.username.includes(search) ||
        student.user.email.includes(search)
      )
    })
    changeInformationInfo(
      <div className="">
        {isValidArray(filteredData) ? (
          filteredData.map((student) => (
            <div key={student.user.id}>
              <UserCardMini {...student} />
            </div>
          ))
        ) : (
          <div>No se encontraron resultados</div>
        )}
      </div>,
    )
  }
  return (
    <div>
      {isLoadingInitialInfo ? (
        <InfoCardsSkeleton />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {generalStatistics(dataInitialInfo).map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center p-6">
                <stat.icono className={`h-8 w-8 ${stat.color} mr-4`} />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.titulo}
                  </p>
                  <h3 className="text-2xl font-bold">{stat.valor}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      {/* Gráfico de inscripciones y actividad reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gráfico de inscripciones */}
        <Card>
          <CardHeader>
            <CardTitle>Inscripciones Mensuales</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {/* <ResponsiveContainer width="100%" height="100%">
                <BarChart data={datosInscripciones}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="inscripciones" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer> */}
          </CardContent>
        </Card>

        {/* Actividad reciente */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {actividadReciente.map((actividad) => (
                <li key={actividad.id} className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">{actividad.accion}</p>
                  <p className="text-sm text-gray-600">{actividad.detalles}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {actividad.tiempo}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Acciones rápidas */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="w-full">
            <User className="mr-2 h-4 w-4" /> Añadir Estudiante
          </Button>
          <Button
            onClick={() => navigate('/panel-administrativo/cursos/crear-curso')}
            className="w-full"
          >
            <Book className="mr-2 h-4 w-4" /> Crear Nuevo Curso
          </Button>
          <Button className="w-full">
            <FileText className="mr-2 h-4 w-4" /> Generar Informe
          </Button>
        </div>
      </section>

      {/* Búsqueda de estudiantes */}
      {isLoading ? (
        <div>cargando ...</div>
      ) : (
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Búsqueda Rápida de Estudiantes
          </h2>
          <div className="flex space-x-4">
            <Input
              placeholder="Buscar por nombre o ID..."
              className="flex-grow"
              onChange={handOnChangeSearch}
            />
            <Button>Buscar</Button>
          </div>
        </section>
      )}
    </div>
  )
}
