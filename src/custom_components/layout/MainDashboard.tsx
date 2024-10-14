import { /* WithAuthProps, */ withAuth } from '@/HOC/withAuth'
import {
  Menu,
} from 'lucide-react'
import { useState } from 'react'

import { Outlet } from 'react-router-dom'
import { ExtraInformation } from './information-components/ExtraInformation'
import { Button } from '@/components/ui/button'

import { Sidebar } from './admin-dashboard/Sidebar'
import { useDashboardStore } from '@/store/useDashBoardStore'




const MainAdminDashboard = () => {
  

  const { isLeftSidebarOpen, isRightSidebarOpen } = useDashboardStore()
  const { toggleLeftSidebar } = useDashboardStore()
  

  const [selectedLabel, setSelectedLabel] = useState('Panel de Administración')

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar izquierdo */}
      <Sidebar />

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
    </div>
  )
}

export const MainAdminDashboardWithAuth = withAuth(MainAdminDashboard)
