import { create } from 'zustand'

interface State {
  isDarkMode: boolean
  toggleDarkMode: () => void
  incrementAmount: () => void
  increment5Amount: () => void
  currentAmount: number
}

export const useThemeStore = create<State>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  currentAmount: 0,
  incrementAmount: () =>
    set((state) => ({ currentAmount: state.currentAmount + 1 })),
  increment5Amount: () =>
    set((state) => ({ currentAmount: state.currentAmount + 5 })),
}))
