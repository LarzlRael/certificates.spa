import { useState } from "react";
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
} from "lucide-react";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useInformationStore } from "@/store/useInformationStore";
import { withAuth, WithAuthProps } from "@/HOC/withAuth";
interface MenuItems {
  icon: any;
  label: string;
  path: string;
}
const rootPath = "/panel-administrativo";
const menuItems: MenuItems[] = [
  { icon: LayoutDashboard, label: "Inicio", path: "/inicio" },
  { icon: Users, label: "Estudiantes", path: "/estudiantes" },
  { icon: Book, label: "Cursos", path: "/cursos" },
  { icon: GraduationCap, label: "Profesores", path: "/profesores" },
  { icon: FileText, label: "Informes", path: "/informes" },
  { icon: DollarSign, label: "Pagos", path: "/pagos" },
  { icon: Settings, label: "Configuración", path: "/configuraciones" },
  { icon: Bell, label: "Notificaciones", path: "/notificaciones" },
];

const SidebarWithAuthHOC = ({ logout }: WithAuthProps) => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const { changeAlertDialogInformation } = useInformationStore();
  return (
    <aside
      className={`bg-white w-64 min-h-screen p-4 transition-all duration-300 ${
        leftSidebarOpen ? "" : "-ml-64"
      }`}
    >
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-2xl font-bold text-blue-600'>Psico educativa</h2>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setLeftSidebarOpen(false)}
          className='lg:hidden'
        >
          <Menu className='h-6 w-6' />
        </Button>
      </div>
      <nav className='space-y-2'>
        <div>
          {menuItems.map((item, index) => (
            <Link
              key={index + "-" + item.path}
              to={`${rootPath}${item.path}`}
              className='w-full flex items-center justify-start px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md'
              /* onClick={() => setSelectedLabel(item.label)} */
            >
              <item.icon className='mr-2 h-4 w-4' />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <div className='absolute bottom-4'>
        {/* <Button
          onClick={() => changeLayout('Dashboard')}
          variant="ghost"
          className="w-full justify-start text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
        </Button>
        <Button
          onClick={() => changeLayout('DashboardBigContent')}
          variant="ghost"
          className="w-full justify-start text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" /> Change Layout
        </Button> */}
        <Button
          onClick={() => {
            changeAlertDialogInformation({
              title: "Cerrar sesión",
              subtitle: "¿Estás seguro de cerrar sesión?",
              isOpen: true,
              content: <></>,
              onConfirm: () => logout(),
            });
          }}
          variant='ghost'
          className='w-full justify-start text-red-500'
        >
          <LogOut className='mr-2 h-4 w-4' /> Cerrar sesión
        </Button>
      </div>
    </aside>
  );
};

export const Sidebar = withAuth(SidebarWithAuthHOC);
