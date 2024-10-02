import { create } from 'zustand'

interface DashboardState {
  isLeftSidebarOpen: boolean
  isRightSidebarOpen: boolean
  toggleRightSidebar: (newState: boolean) => void // Corregido
  toggleLeftSidebar: (newState: boolean) => void // Corregido
}

export const useDashboardStore = create<DashboardState>((set) => ({
  isLeftSidebarOpen: true,
  isRightSidebarOpen: true,
  toggleLeftSidebar: (newState: boolean) =>
    set({ isLeftSidebarOpen: newState }),
  toggleRightSidebar: (newState: boolean) =>
    set({ isRightSidebarOpen: newState }),
}))
