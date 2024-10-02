import { WithAuthProps, withAuth } from '@/HOC/withAuth'
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
import { useState } from 'react'

import { useNavigate, Link, Outlet } from 'react-router-dom'
import { ExtraInformation } from './ExtraInformation'
import { Button } from '@/components/ui/button'
import { DialogInformation } from './dasboard/DialogInformation'
import { AlertDialogInformation } from './dasboard/AlertDialogInformation'
import { useInformationStore } from '@/store/useInformationStore'
import { useDashboardStore } from '@/store/useDashBoardStore'

interface MenuItems {
  icon: any
  label: string
  path: string
}
const rootPath = '/panel-administrativo'

const MainAdminDashboard = ({ logout }: WithAuthProps) => {
  const { clearExtraInformation } = useInformationStore()

  const { isLeftSidebarOpen, isRightSidebarOpen } = useDashboardStore()
  const { toggleLeftSidebar } = useDashboardStore()
  const { toggleRightSidebar } = useDashboardStore()

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
                  setSelectedLabel(item.label)
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

      {/* Contenido principal */}
      <main
        className={`flex-1 py-8 px-8 overflow-y-auto transition-all duration-300 ${
          isRightSidebarOpen ? 'mr-0' : ''
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{selectedLabel}</h1>
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleLeftSidebar(!isLeftSidebarOpen)}
              className="mr-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleRightSidebar(!isRightSidebarOpen)}
            >
              <Bell className="h-4 w-4" />
            </Button> */}
          </div>
        </div>
        <div>
          {/* ir atras */}
          <Outlet />
        </div>
      </main>

      <aside
        className={`bg-white w-96 min-h-screen p-4 transition-all duration-300 ${
          isRightSidebarOpen ? 'flex flex-col' : 'hidden'
        }`}
      >
        <div className="flex-1 overflow-auto">
          <ExtraInformation />
        </div>
      </aside>

      {/* Dialogs and AlertDialogs components */}
      <DialogInformation />
      <AlertDialogInformation />
    </div>
  )
}

export const MainAdminDashboardWithAuth = withAuth(MainAdminDashboard)
