import { create } from 'zustand'

interface DashboardState {
  key: string
}

export const useDashboardStore = create<DashboardState>()(() => ({
  key: 'DarkMeeting',
}))
