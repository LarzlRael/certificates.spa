import { ComponentType, FC } from "react";
import {
  useInformationStore,
  DialogInformation,
  SheetInformation,
} from "@/store/useInformationStore"; // Ajusta el nombre si es necesario
import { useDashboardStore } from "@/store/useDashBoardStore"; // Ajusta el nombre si es necesario

export interface WithSidebarAndInfoProps {
  extraInformation?: React.ReactNode;
  isLeftSidebarOpen: boolean;
  isRightSidebarOpen: boolean;
  changeDialogInformation: (dialogInformation: DialogInformation) => void;
  changeExtraInformation: (dialogInformation: DialogInformation) => void;
  clearExtraInformation: () => void;
  toggleLeftSidebar: (newState: boolean) => void;
  toggleRightSidebar: (newState: boolean) => void;
  changeSheetInformation: (sheetInformation: SheetInformation) => void;
}

// HOC para añadir lógica de sidebar e información extra a un componente
export function withHandleInformation<
  T extends Partial<WithSidebarAndInfoProps>
>(Component: ComponentType<T>): FC<Omit<T, keyof WithSidebarAndInfoProps>> {
  return function WithSidebarAndInfo(
    props: Omit<T, keyof WithSidebarAndInfoProps>
  ) {
    // Obtener valores y funciones del store de información
    const {
      clearExtraInformation,
      extraInformation,
      changeDialogInformation,
      changeExtraInformation,
      changeSheetInformation,
    } = useInformationStore();

    // Obtener valores y funciones del store de dashboard (sidebars)
    const {
      isLeftSidebarOpen,
      isRightSidebarOpen,
      toggleLeftSidebar,
      toggleRightSidebar,
    } = useDashboardStore();

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
    } as unknown as T; // Casting primero a `unknown`, luego a `T`

    // Renderiza el componente envuelto con las props combinadas
    return <Component {...combinedProps} />;
  };
}
