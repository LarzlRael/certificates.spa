import { create } from 'zustand'
import { useDashboardStore } from './useDashBoardStore'

type Side = 'top' | 'right' | 'bottom' | 'left'

interface BaseInformationInterface {
  isOpen: boolean
  title?: string
  subtitle?: string
  content: React.ReactNode | undefined
  maxWidth?: string
  isClosable?: boolean
}
/* export interface ExtraInformationState extends BaseInformationInterface {


} */
export interface SheetInformation extends BaseInformationInterface {
  side?: Side
}

export interface DialogInformation extends BaseInformationInterface {
  maxWidth?: string
  isClosable?: boolean
}
interface AlertDialogInformation extends BaseInformationInterface {
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
}

export interface DialogState {
  dialogContent: DialogInformation
  sheetInformation: SheetInformation
  alertDialogContent: AlertDialogInformation
  extraInformation: BaseInformationInterface
  changeAlertDialogInformation: (
    alertDialogInformation: AlertDialogInformation,
  ) => void
  changeExtraInformation: (extraInformation: BaseInformationInterface) => void
  changeDialogInformation: (dialogInformation: DialogInformation) => void
  changeSheetInformation: (sheetInformation: SheetInformation) => void
  clearDialogInformation: () => void
  clearExtraInformation: () => void
}

export const useInformationStore = create<DialogState>((set) => ({
  isOpenLeftSidebar: true,
  isOpenRightSidebar: false,
  sheetInformation: {
    isOpen: false,
    title: '',
    subtitle: '',
    content: undefined,
    side: 'bottom',
    isClosable: true,
  },
  dialogContent: {
    isOpen: false,
    title: '',
    subtitle: '',
    maxWidth: '425',
    content: undefined,
    isClosable: true,
  },
  extraInformation: {
    isOpen: false,
    title: '',
    subtitle: '',
    content: undefined,
    maxWidth: '425',
    isClosable: true,
  },
  alertDialogContent: {
    isOpen: false,
    isClosable: true,
    title: '',
    subtitle: '',
    content: undefined,
  },
  clearExtraInformation: () => {
    const { toggleRightSidebar } = useDashboardStore.getState()
    toggleRightSidebar(false)
    set({
      extraInformation: {
        isOpen: false,
        title: '',
        subtitle: '',
        content: undefined,
        maxWidth: '425',
        isClosable: true,
      },
    })
  },
  clearDialogInformation: () =>
    set({ dialogContent: { isOpen: false, content: undefined } }),

  changeAlertDialogInformation: (alertDialogInformation) =>
    set({ alertDialogContent: alertDialogInformation }),

  changeExtraInformation: (extraInformation) => {
    const { toggleRightSidebar } = useDashboardStore.getState()
    toggleRightSidebar(true)
    set({ extraInformation })
  },
  changeSheetInformation: (sheetInformation) => set({ sheetInformation }),

  changeDialogInformation: (info) =>
    set({
      dialogContent: {
        maxWidth: info.maxWidth || '425',
        isOpen: info.isOpen,
        title: info.title,
        subtitle: info.subtitle,
        content: info.content,
      },
    }),
}))
