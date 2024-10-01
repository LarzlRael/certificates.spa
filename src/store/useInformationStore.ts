import { create } from 'zustand'

interface DialogInformation {
  isDialogOpen: boolean
  title?: string
  subtitle?: string
  content: React.ReactNode | undefined
}

interface DialogState {
  dialogContent: DialogInformation
  extraInformation: React.ReactNode | undefined
  changeExtraInformation: (extraInformation: React.ReactNode) => void
  changeDialogInformation: (dialogInformation: DialogInformation) => void
}

export const useInformationStore = create<DialogState>((set) => ({
  dialogContent: {
    isDialogOpen: false,
    title: '',
    subtitle: '',
    content: undefined,
  },
  extraInformation: undefined,
  changeExtraInformation: (extraInformation) => set({ extraInformation }),

  changeDialogInformation: (info) =>
    set({
      dialogContent: {
        isDialogOpen: info.isDialogOpen,
        title: info.title,
        subtitle: info.subtitle,
        content: info.content,
      },
    }),
}))
