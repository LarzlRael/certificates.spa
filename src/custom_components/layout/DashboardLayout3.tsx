import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
/* import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts' */
import {
  Book,
  Calendar,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
  Users,
  FileText,
  DollarSign,
  Bell,
} from 'lucide-react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ExtraInformation } from './information-components/ExtraInformation'
import { useAuthStore } from '@/store/authStore'
import { withAuth, WithAuthProps } from '@/HOC/withAuth'
import PieChart from '../charts/PieChart'

const estadisticasGenerales = [
  {
    titulo: 'Total Estudiantes',
    valor: '5,234',
    icono: Users,
    color: 'text-blue-500',
  },
  {
    titulo: 'Cursos Activos',
    valor: '127',
    icono: Book,
    color: 'text-green-500',
  },
  {
    titulo: 'Profesores',
    valor: '89',
    icono: GraduationCap,
    color: 'text-purple-500',
  },
  {
    titulo: 'Ingresos Mensuales',
    valor: '$52,489',
    icono: DollarSign,
    color: 'text-yellow-500',
  },
]

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

export const AdminDashboardEducativo = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Users, label: 'Estudiantes' },
    { icon: Book, label: 'Cursos' },
    { icon: GraduationCap, label: 'Profesores' },
    { icon: FileText, label: 'Informes' },
    { icon: DollarSign, label: 'Pagos' },
    { icon: Settings, label: 'Configuración' },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar izquierdo */}
      <aside
        className={`bg-white w-64 min-h-screen p-4 transition-all duration-300 ${
          leftSidebarOpen ? '' : '-ml-64'
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-blue-600">EduAdmin</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLeftSidebarOpen(false)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="space-y-2">
          <div>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.label}
                className="w-full flex items-center justify-start px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="absolute bottom-4">
          <Button variant="ghost" className="w-full justify-start text-red-500">
            <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
          </Button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            {!leftSidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLeftSidebarOpen(true)}
                className="mr-4"
              >
                <Menu className="h-6 w-6" />
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Panel de Administración
              </h1>
              <p className="text-gray-600">
                Bienvenido, Admin. Aquí tienes un resumen de la plataforma.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
            >
              {rightSidebarOpen ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Foto de perfil"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Estadísticas generales */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {estadisticasGenerales.map((stat, index) => (
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

        {/* Gráfico de inscripciones y actividad reciente */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de inscripciones */}
          <Card>
            <CardHeader>
              <CardTitle>Inscripciones Mensuales gente xd?</CardTitle>
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
              <PieChart
                data={[
                  { value: 90, color: '#ff6384' }, // Color rojo
                  { value: 10, color: '#36a2eb' }, // Color azul
                  
                ]}
              />
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
                    <p className="text-sm text-gray-600">
                      {actividad.detalles}
                    </p>
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
            <Button className="w-full">
              <Book className="mr-2 h-4 w-4" /> Crear Nuevo Curso
            </Button>
            <Button className="w-full">
              <FileText className="mr-2 h-4 w-4" /> Generar Informe
            </Button>
          </div>
        </section>

        {/* Búsqueda de estudiantes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Búsqueda Rápida de Estudiantes
          </h2>
          <div className="flex space-x-4">
            <Input
              placeholder="Buscar por nombre o ID..."
              className="flex-grow"
            />
            <Button>Buscar</Button>
          </div>
        </section>
      </main>

      {/* Sidebar derecho */}
      <aside
        className={`bg-white w-64 min-h-screen p-4 transition-all duration-300 ${
          rightSidebarOpen ? '' : 'translate-x-64'
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
        <div className="space-y-4">
          {notificaciones.map((notificacion) => (
            <Card key={notificacion.id}>
              <CardHeader>
                <CardTitle className="text-sm">{notificacion.titulo}</CardTitle>
                <CardDescription className="text-xs">
                  {notificacion.tiempo}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{notificacion.contenido}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </aside>
    </div>
  )
}

interface MenuItems {
  icon: any
  label: string
  path: string
}
const rootPath = '/panel-administrativo'

const MainAdminDashboard = ({ logout }: WithAuthProps) => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)

  const navigate = useNavigate()

  const menuItems: MenuItems[] = [
    { icon: LayoutDashboard, label: 'Inicio', path: '/inicio' },
    { icon: Users, label: 'Estudiantes', path: '/estudiantes' },
    { icon: Book, label: 'Cursos', path: '/cursos' },
    { icon: GraduationCap, label: 'Profesores', path: '/profesores' },
    { icon: FileText, label: 'Informes', path: '/informes' },
    { icon: DollarSign, label: 'Pagos', path: '/pagos' },
    { icon: Settings, label: 'Configuración', path: '/configuraciones' },
    { icon: Bell, label: 'Notificaciones', path: '/notificaciones' },
  ]
  const [selectedLabel, setSelectedLabel] = useState('Panel de Administración')

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar izquierdo */}
      <aside
        className={`bg-white w-64 min-h-screen p-4 transition-all duration-300 ${
          leftSidebarOpen ? '' : '-ml-64'
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-blue-600">Psico educativa</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLeftSidebarOpen(false)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="space-y-2">
          <div>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={`${rootPath}${item.path}`}
                className="w-full flex items-center justify-start px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setSelectedLabel(item.label)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="absolute bottom-4">
          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start text-red-500"
          >
            <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
          </Button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 py-8 px-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{selectedLabel}</h1>
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
              className="mr-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
            >
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Outlet />
      </main>

      {/* Sidebar derecho */}
      <aside
        className={`bg-white w-64 min-h-screen p-4 transition-all duration-300 ${
          rightSidebarOpen ? '' : 'translate-x-64'
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
        <div className="space-y-4">
          {/* {notificaciones.map((notificacion) => (
            <Card key={notificacion.id}>
              <CardHeader>
                <CardTitle className="text-sm">{notificacion.titulo}</CardTitle>
                <CardDescription className="text-xs">
                  {notificacion.tiempo}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{notificacion.contenido}</p>
              </CardContent>
            </Card>
          ))} */}
          <ExtraInformation />
        </div>
      </aside>
    </div>
  )
}
/* export const DashboardWithAuth = withAuth(AdminDashboardEducativo2) */

/* export default withAuth(AdminDashboardEducativo2) */
export const MainAdminDashboardWithAuth = withAuth(
  MainAdminDashboard,
)
