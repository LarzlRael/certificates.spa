import { ComponentType, FC } from 'react'
import {
  useInformationStore,
  DialogInformation,
  SheetInformation
} from '@/store/useInformationStore' // O el nombre que corresponda a tu store
import { useDashboardStore } from '@/store/useDashBoardStore' // O el nombre que corresponda a tu store

export interface WithSidebarAndInfoProps {
  extraInformation: React.ReactNode | undefined
  isLeftSidebarOpen: boolean
  isRightSidebarOpen: boolean
  changeDialogInformation: (dialogInformation: DialogInformation) => void
  changeExtraInformation: (dialogInformation: DialogInformation) => void
  clearExtraInformation: () => void
  toggleLeftSidebar: (newState: boolean) => void
  toggleRightSidebar: (newState: boolean) => void
  changeSheetInformation: (sheetInformation: SheetInformation) => void;


}

// HOC para añadir lógica de sidebar e información extra a un componente
export function withHandleInformation<T extends WithSidebarAndInfoProps>(
  Component: ComponentType<T>,
): FC<Omit<T, keyof WithSidebarAndInfoProps>> {
  return function WithSidebarAndInfo(
    props: Omit<T, keyof WithSidebarAndInfoProps>,
  ) {
    // Obtener valores y funciones del store de información
    const {
      clearExtraInformation,
      extraInformation,
      changeDialogInformation,
      changeExtraInformation,
      changeSheetInformation
    } = useInformationStore()

    // Obtener valores y funciones del store de dashboard (sidebars)
    const {
      isLeftSidebarOpen,
      isRightSidebarOpen,
      toggleLeftSidebar,
      toggleRightSidebar,
    } = useDashboardStore()

    // Combina todas las propiedades
    const combinedProps = {
      clearExtraInformation,
      changeDialogInformation,
      extraInformation,
      isLeftSidebarOpen,
      isRightSidebarOpen,
      toggleLeftSidebar,
      toggleRightSidebar,
      changeExtraInformation,
      changeSheetInformation,
      ...props, // Mantener otras props que se pasen al componente
    }

    // Renderiza el componente envuelto con las props combinadas
    return <Component {...(combinedProps as T)} />
  }
}
