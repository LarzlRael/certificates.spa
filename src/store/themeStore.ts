import { create } from 'zustand'

interface State {
  isDarkMode: boolean
  informationInfo: React.ReactNode | null
  toggleDarkMode: () => void
  changeInformationInfo: (info: React.ReactNode | null) => void
}

export const useThemeStore = create<State>((set) => ({
  isDarkMode: false,
  informationInfo: null,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  changeInformationInfo: (info) => set({ informationInfo: info }),
}))
