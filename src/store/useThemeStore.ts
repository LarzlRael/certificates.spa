// useThemeStore.ts
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
  layout: {
    content: string
    responsive: string
  }
  navigation: boolean
  layoutStyle: LayoutStyle

  toggleDarkMode: () => void
  changeLayout: (layoutStyle: LayoutStyle, navigation?: boolean) => void
}

export const useThemeStore = create<State>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  layout: {
    content: `"Navbar Navbar Navbar Navbar" "Content Content Content Inf"`,
    responsive: `"Navbar" "Content" "Inf" "Inf"`,
  },
  layoutStyle: 'Dashboard',
  navigation: true,

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

    set({
      layout,
      navigation,
    })
  },
}))
