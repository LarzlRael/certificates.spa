import { create } from 'zustand'

interface DialogInformation {
  isDialogOpen: boolean
  title?: string
  subtitle?: string
  content: React.ReactNode | undefined
  maxWidth?: string
}
interface AlertDialogInformation {
  isAlertDialogOpen: boolean
  title?: string
  subtitle?: string
  content: React.ReactNode | undefined
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
}

interface DialogState {
  dialogContent: DialogInformation
  alertDialogContent: AlertDialogInformation
  extraInformation: React.ReactNode | undefined
  changeAlertDialogInformation: (
    alertDialogInformation: AlertDialogInformation,
  ) => void
  changeExtraInformation: (extraInformation: React.ReactNode) => void
  changeDialogInformation: (dialogInformation: DialogInformation) => void
  clearDialogInformation: () => void
  isOpenLeftSidebar: boolean
  isOpenRightSidebar: boolean

  toggleRightSidebar: () => void // Nuevo método para abrir el sidebar
  toggleLeftSidebar: () => void // Método para cerrar el sidebar
}

export const useInformationStore = create<DialogState>((set) => ({
  isOpenLeftSidebar: true,
  isOpenRightSidebar: true,

  toggleRightSidebar: () =>
    set((state) => ({ isOpenRightSidebar: !state.isOpenRightSidebar })),
  toggleLeftSidebar: () =>
    set((state) => ({ isOpenLeftSidebar: !state.isOpenLeftSidebar })),
  dialogContent: {
    isDialogOpen: false,
    title: '',
    subtitle: '',
    maxWidth: '425',
    content: undefined,
  },
  extraInformation: undefined,
  alertDialogContent: {
    isAlertDialogOpen: false,
    title: '',
    subtitle: '',
    content: undefined,
  },
  clearDialogInformation: () =>
    set({ dialogContent: { isDialogOpen: false, content: undefined } }),
  changeAlertDialogInformation: (alertDialogInformation) =>
    set({ alertDialogContent: alertDialogInformation }),
  changeExtraInformation: (extraInformation) => {
    set((state) => {
      // Verifica si el sidebar derecho está cerrado
      if (!state.isOpenRightSidebar) {
        // Abre el sidebar derecho si está cerrado
        state.isOpenRightSidebar = true
      }
      return { extraInformation } // Devuelve el nuevo valor de extraInformation
    })
  },

  changeDialogInformation: (info) =>
    set({
      dialogContent: {
        maxWidth: info.maxWidth || '425',
        isDialogOpen: info.isDialogOpen,
        title: info.title,
        subtitle: info.subtitle,
        content: info.content,
      },
    }),
}))
