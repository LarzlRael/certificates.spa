import { Link, Outlet } from 'react-router-dom'
import { webName } from '../../constants/web-constants'
import { AuthStatus, useAuthStore } from '@/store/authStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExtraInformation } from './information-components/ExtraInformation'

interface LinkButton {
  name: string
  href: string
  onClick?: () => void
}

export default function DashboardLayout() {
  const { logout } = useAuthStore()
  const { authStatus, user } = useAuthStore()

  const navigate = useNavigate()
  const links: LinkButton[] = [
    { name: 'Cursos', href: 'cursos' },
    { name: 'Estudiantes', href: 'estudiantes' },
    { name: 'Notificaciones', href: 'notificaciones' },
    {
      name: 'Cerrar sesion',
      href: 'Cerrar',
      onClick: logout,
    },
  ]


  useEffect(() => {
    if (authStatus === AuthStatus.UNAUTHENTICATED) {
      logout()
      navigate('/login')
    }
  }, [authStatus])

  return (
    <>
      <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                id="toggleSidebarMobile"
                aria-expanded="true"
                aria-controls="sidebar"
                className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
              >
                {/* Toggle Sidebar Button */}
                <svg
                  id="toggleSidebarMobileHamburger"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <a
                href="#"
                className="text-xl font-bold flex items-center lg:ml-2.5"
              >
                <img
                  src="/logo_butter_fly.png"
                  alt="logo"
                  className="w-16 h-12"
                />
                <span className="self-center whitespace-nowrap ml-2">
                  {webName}
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-500 text-white p-2 rounded-full w-12 h-12 flex items-center justify-center">
                <img
                  src={user?.profileImageUrl || '/avatar.png'}
                  alt="avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex overflow-hidden bg-white pt-16">
        {/* Primer Aside */}
        <aside
          id="sidebar"
          className="fixed hidden z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
          aria-label="Sidebar"
        >
          <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex-1 px-3 bg-white divide-y space-y-1">
                <ul className="space-y-2 pb-2">
                  {links.map((link) =>
                    link.onClick ? (
                      <li key={link.name}>
                        <button
                          onClick={link.onClick}
                          className="flex items-center justify-start w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                        >
                          {link.name}
                        </button>
                      </li>
                    ) : (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="flex items-center justify-start w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </aside>

        {/* Segundo Aside */}
        <aside
          id="second-sidebar"
          className="fixed hidden z-20 h-full top-0 right-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
          aria-label="Second Sidebar"
        >
          <div className="relative flex-1 flex flex-col min-h-0 border-l border-gray-200 bg-white pt-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex-1 px-3 bg-white divide-y space-y-1">
                <ul className="space-y-2 pb-2">
                  <ExtraInformation /* informationComponent={
                    <div>
                      <h3 className="text-lg font-semibold">Información Adicional</h3>
                      <p className="text-sm text-gray-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, dolores.
                      </p>
                    </div>
                  } *//>
                </ul>
              </div>
            </div>
          </div>
        </aside>

        <div
          id="main-content"
          className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
        >
          <main>
            <div className="pt-6 px-4">
              <div className="w-full min-h-[calc(100vh-230px)]">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  <Outlet />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
