import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import UserCardMini from '@/custom_components/cards/UserCard'
import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'
import { useInformationStore } from '@/store/useInformationStore'
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
import { DashBoardInitialInterface } from './interfaces/course.interface'
/* import { Student } from './interfaces/enrollment-by-course-interface'
import { Skeleton } from '@/components/ui/skeleton' */
import { InfoCardsSkeleton } from '@/custom_components/cards/Dashboards'
import { LatestUpdatesInterface } from './interfaces/dashboard.interfaces'
import {
  LatestUpdateCards,
  LatestUpdateListSkeleton,
} from '@/custom_components/cards/LatestUpdateCard'
import { QuickActionSkeleton } from '@/custom_components/loading/QuickActionSkeleton'
/* import PieChart from '@/custom_components/charts/PieChart' */
import BarChart from '@/custom_components/charts/Bar'
import { UserStudentDetail } from './interfaces/students.interface'
import { AddNewUser } from './components/AddNewUser'

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

/* const actividadReciente = [
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
] */

export const DashBoardHomePage = () => {
  const navigate = useNavigate()
  const { changeExtraInformation } = useInformationStore()
  const { clearExtraInformation } = useInformationStore()
  const { changeDialogInformation } = useInformationStore()
  const { data, isLoading } = useAxiosQueryAuth<
    UserStudentDetail[]
  >({
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

  const {
    data: lastUpdated,
    isLoading: isLoadinglastUpdated,
  } = useAxiosQueryAuth<LatestUpdatesInterface[]>({
    url: `/users/get-latest-updates`,
    method: 'GET',
  })

  const handOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value
    if (e.target.value === '') {
      clearExtraInformation()
      return
    }
    const filteredData = data.filter((user) => {
      return user.username.includes(search) || user.email.includes(search)
    })
    changeExtraInformation({
      isOpen: true,
      title: 'Resultados de la búsqueda',
      content: (
        <div className="">
          {isValidArray(filteredData) ? (
            filteredData.map((user) => (
              <div key={user.id}>
                <UserCardMini
                  onClick={() => {
                    navigate(
                      `/panel-administrativo/perfil-estudiante/${user.idStudent}`,
                    )
                  }}
                  student={user}
                />
              </div>
            ))
          ) : (
            <div>No se encontraron resultados</div>
          )}
        </div>
      ),
    })
  }
  return (
    <div>
      {isLoadingInitialInfo ? (
        <InfoCardsSkeleton />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {generalStatistics(dataInitialInfo!).map((stat, index) => (
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
            {/*  <PieChart
                data={[
                  { value: 40, color: '#ff6384' }, // Color rojo
                  { value: 30, color: '#36a2eb' }, // Color azul
                  { value: 20, color: '#ffce56' }, // Color amarillo
                  { value: 10, color: '#4bc0c0' }, // Color verde
                ]}
              /> */}
            <BarChart
              data={[
                { label: 'Enero', value: 40, color: '#ff6384' }, // Color rojo
                { label: 'Febrero', value: 30, color: '#36a2eb' }, // Color azul
                { label: 'Marzo', value: 20, color: '#ffce56' }, // Color amarillo
                { label: 'Abril', value: 10, color: '#4bc0c0' }, // Color verde
                { label: 'Abril', value: 10, color: '#4bc0c0' }, // Color verde
                { label: 'Abril', value: 100, color: '#4bc0c0' }, // Color verde
              ]}
            />
          </CardContent>
        </Card>

        {/* Actividad reciente */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          {isLoadinglastUpdated ? (
            <LatestUpdateListSkeleton />
          ) : (
            isValidArray(lastUpdated) && (
              <LatestUpdateCards listElements={lastUpdated!} />
            )
          )}
        </Card>
      </div>

      {/* Acciones rápidas */}

      {/* <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader> */}
      {/* <section className="mb-8"> */}
      {/* <h2 className="text-2xl font-semibold mb-4"></h2> */}
      {isLoading ? (
        <QuickActionSkeleton />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                className="w-full"
                onClick={() => {
                  changeDialogInformation({
                    isOpen: true,
                    content: <AddNewUser />,
                  })
                }}
              >
                <User className="mr-2 h-4 w-4" /> Añadir Estudiante
              </Button>
              <Button
                onClick={() =>
                  navigate('/panel-administrativo/cursos/crear-curso')
                }
                className="w-full"
              >
                <Book className="mr-2 h-4 w-4" /> Crear Nuevo Curso
              </Button>
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" /> Generar Informe
              </Button>
            </div>

            {/* </section> */}

            {/* Búsqueda de estudiantes */}
            {isLoading ? (
              <div>cargando ...</div>
            ) : (
              <section>
                <CardHeader>
                  <CardTitle>Búsqueda Rápida de Estudiantes</CardTitle>
                </CardHeader>

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
          </CardContent>
        </Card>
      )}
    </div>
  )
}
