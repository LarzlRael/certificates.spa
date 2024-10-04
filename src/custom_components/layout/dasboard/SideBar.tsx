import { Button } from '@/components/ui/button'
import {
  withHandleInformation,
  WithSidebarAndInfoProps,
} from '@/HOC/withHandleInformation'
import { useAuthStore } from '@/store/authStore'
import {
  LayoutDashboard,
  Users,
  Book,
  GraduationCap,
  FileText,
  DollarSign,
  Settings,
  Bell,
  Menu,
  LogOut,
} from 'lucide-react'

import { Link } from 'react-router-dom'

interface MenuItems {
  icon: any
  label: string
  path: string
}

const rootPath = '/panel-administrativo'

const SideBarWithSidebar = ({
  isLeftSidebarOpen,
  toggleLeftSidebar,
  clearExtraInformation,
}: WithSidebarAndInfoProps) => {
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
  /* const [selectedLabel, setSelectedLabel] = useState('Panel de Administración') */

  const { logout } = useAuthStore()
  return (
    <aside
      className={`bg-white w-64 min-h-screen p-4 transition-all duration-300 ${
        isLeftSidebarOpen ? '' : '-ml-64'
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-blue-600">Psico educativa</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleLeftSidebar(!isLeftSidebarOpen)}
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
              onClick={() => {
                /* setSelectedLabel(item.label) */
                clearExtraInformation()
              }}
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
  )
}

export const SideBar = withHandleInformation(SideBarWithSidebar)
