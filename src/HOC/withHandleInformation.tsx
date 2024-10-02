import { ComponentType, FC } from 'react'
import { useInformationStore } from '@/store/informationStore' // O el nombre que corresponda a tu store
import { useDashboardStore } from '@/store/dashboardStore' // O el nombre que corresponda a tu store

export interface WithSidebarAndInfoProps {
  extraInformation: React.ReactNode | undefined
  isLeftSidebarOpen: boolean
  isRightSidebarOpen: boolean
  clearExtraInformation: () => void
  toggleLeftSidebar: (newState: boolean) => void
  toggleRightSidebar: (newState: boolean) => void
}

// HOC para añadir lógica de sidebar e información extra a un componente
export function withHandleInformation<T extends WithSidebarAndInfoProps>(
  Component: ComponentType<T>,
): FC<Omit<T, keyof WithSidebarAndInfoProps>> {
  return function WithSidebarAndInfo(props: Omit<T, keyof WithSidebarAndInfoProps>) {
    // Obtener valores y funciones del store de información
    const { clearExtraInformation, extraInformation } = useInformationStore()
    
    // Obtener valores y funciones del store de dashboard (sidebars)
    const { isLeftSidebarOpen, isRightSidebarOpen, toggleLeftSidebar, toggleRightSidebar } = useDashboardStore()

    // Combina todas las propiedades
    const combinedProps = {
      clearExtraInformation,
      extraInformation,
      isLeftSidebarOpen,
      isRightSidebarOpen,
      toggleLeftSidebar,
      toggleRightSidebar,
      ...props, // Mantener otras props que se pasen al componente
    }

    // Renderiza el componente envuelto con las props combinadas
    return <Component {...(combinedProps as T)} />
  }
}
