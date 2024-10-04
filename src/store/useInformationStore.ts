import { create } from 'zustand'
import { useDashboardStore } from './useDashBoardStore'
export interface DialogInformation {
  isDialogOpen: boolean
  title?: string
  subtitle?: string
  content: React.ReactNode | undefined
  maxWidth?: string
  isClosable?: boolean
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

export interface DialogState {
  dialogContent: DialogInformation
  alertDialogContent: AlertDialogInformation
  extraInformation: React.ReactNode | undefined
  changeAlertDialogInformation: (
    alertDialogInformation: AlertDialogInformation,
  ) => void
  changeExtraInformation: (extraInformation: React.ReactNode) => void
  changeDialogInformation: (dialogInformation: DialogInformation) => void
  clearDialogInformation: () => void
  clearExtraInformation: () => void
}

export const useInformationStore = create<DialogState>((set) => ({
  isOpenLeftSidebar: true,
  isOpenRightSidebar: false,

  dialogContent: {
    isDialogOpen: false,
    title: '',
    subtitle: '',
    maxWidth: '425',
    content: undefined,
    isClosable: true,
  },
  extraInformation: undefined,
  alertDialogContent: {
    isAlertDialogOpen: false,
    title: '',
    subtitle: '',
    content: undefined,
  },
  clearExtraInformation: () => {
    const { toggleRightSidebar } = useDashboardStore.getState()
    toggleRightSidebar(false)
    set({ extraInformation: undefined })
  },
  clearDialogInformation: () =>
    set({ dialogContent: { isDialogOpen: false, content: undefined } }),
  changeAlertDialogInformation: (alertDialogInformation) =>
    set({ alertDialogContent: alertDialogInformation }),
  changeExtraInformation: (extraInformation) => {
    const { toggleRightSidebar } = useDashboardStore.getState()
    toggleRightSidebar(true)
    set({ extraInformation })
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
