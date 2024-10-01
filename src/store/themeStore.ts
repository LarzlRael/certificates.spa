import { create } from 'zustand'

type LayoutStyle =
  | 'Home'
  | 'FullScreen'
  | 'FullContent'
  | 'ContentOnly'
  | 'BigInformation'
  | 'Dashboard'
  | 'DashboardBigContent'

interface DialogInformation {
  isDialogOpen: boolean
  title?: string
  subtitle?: string
  content: React.ReactNode | undefined
}
interface State {
  isDarkMode: boolean
  dialogContent: DialogInformation
  extraInformation: React.ReactNode | undefined
  layout: {
    content: string
    responsive: string
  }
  navigation: boolean
  layoutStyle: LayoutStyle

  changeExtraInformation: (extraInformation: React.ReactNode) => void
  changeDialogInformation: (dialogInformation: DialogInformation) => void
  toggleDarkMode: () => void
  changeLayout: (layoutStyle: LayoutStyle, navigation?: boolean) => void
}

export const useThemeStore = create<State>((set) => ({
  informationDialog: null,
  isDarkMode: false,
  openProfileDialog: false,
  dialogContent: {
    content: undefined,
    isDialogOpen: false,
    title: '',
    subtitle: '',
  },
  extraInformation: undefined,
  changeExtraInformation: (extraInformation) =>
    set({ extraInformation: extraInformation }),

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  changeDialogInformation: (info) =>
    set({
      dialogContent: {
        isDialogOpen: info.isDialogOpen,
        title: info.title,
        subtitle: info.subtitle,
        content: info.content,
      },
    }),

  layout: {
    content: `"Navbar Navbar Navbar Navbar" "Content Content Content Inf"`,
    responsive: `"Navbar" "Content" "Inf" "Inf"`,
  },
  layoutStyle: 'Dashboard',
  navigation: true,

  // Corrección de la función changeLayout
  changeLayout: (layoutStyle: LayoutStyle, navigation = true) => {
    let layout = {
      content: `"Navbar Navbar Navbar Navbar" "Content Content Content Inf"`,
      responsive: `"Navbar" "Content" "Inf" "Inf"`,
    }

    switch (layoutStyle) {
      case 'Home':
        layout = {
          content: `"Navbar Navbar Navbar Navbar" "Content Content Content Content"`,
          responsive: `"Navbar" "Content" "Content" "Content"`,
        }
        break
      case 'Dashboard':
        layout = {
          content: `"Sidebar Navbar Navbar Inf"
                  "Sidebar Content Content Inf"`,
          responsive: `"Navbar" "Content" "Content" "Content"`,
        }
        break
      case 'FullScreen':
        layout = {
          content: `"Navbar Navbar Navbar Navbar" "Content Content Content Content"`,
          responsive: `"Navbar" "Content" "Content" "Content"`,
        }
        break
      case 'FullContent':
        layout = {
          content: `"Content Content Content Content" "Content Content Content Content"`,
          responsive: `"Content" "Content" "Content" "Content"`,
        }
        break
      case 'ContentOnly':
        layout = {
          content: `"Content Content Content Content" "Content Content Content Content"`,
          responsive: `"Content" "Content" "Content" "Content"`,
        }
        break
      case 'BigInformation':
        layout = {
          content: `"Navbar Navbar Navbar Navbar" "Content Content Inf Inf"`,
          responsive: `"Navbar" "Content" "Inf" "Inf"`,
        }
        break
      case 'DashboardBigContent':
        layout = {
          content: `"Sidebar Navbar Navbar Navbar"
                  "Sidebar Content Content Content"`,
          responsive: `"Navbar" "Content" "Inf" "Inf"`,
        }
        break
      default:
        break
    }

    // Actualizamos el estado con el nuevo layout y la navegación
    set({
      layout,
      navigation,
    })
  },
}))
