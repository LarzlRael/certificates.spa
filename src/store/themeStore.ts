import { create } from 'zustand'

type LayoutStyle =
  | 'Home'
  | 'FullScreen'
  | 'FullContent'
  | 'ContentOnly'
  | 'BigInformation'
  | 'Dashboard'
  | 'DashboardBigContent'

interface State {
  isDarkMode: boolean
  informationInfo: React.ReactNode | null
  toggleDarkMode: () => void
  changeInformationInfo: (info: React.ReactNode | null) => void
  layout: {
    content: string
    responsive: string
  }
  navigation: boolean
  layoutStyle: LayoutStyle
  openProfileDialog: boolean
  setProfileDialog: (open: boolean) => void
  changeLayout: (layoutStyle: LayoutStyle, navigation?: boolean) => void
}

export const useThemeStore = create<State>((set) => ({
  isDarkMode: false,
  openProfileDialog: false,
  informationInfo: null,
  setProfileDialog: (open) => set({ openProfileDialog: open }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  changeInformationInfo: (info) => set({ informationInfo: info }),

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
