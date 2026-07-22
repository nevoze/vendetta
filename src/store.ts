
import { create } from 'zustand'
import { Log } from '../shared/types'

interface AppState {
  logs: Log[]
  totalLogs: number
  apiKey: string
  isAuthenticated: boolean
  setApiKey: (key: string) => void
  setAuthenticated: (auth: boolean) => void
  fetchLogs: (params?: any) => Promise<void>
}

export const useStore = create<AppState>((set) => ({
  logs: [],
  totalLogs: 0,
  apiKey: localStorage.getItem('fivem_api_key') || '',
  isAuthenticated: localStorage.getItem('vendetta_auth') === 'true',
  setApiKey: (key) => {
    localStorage.setItem('fivem_api_key', key)
    set({ apiKey: key })
  },
  setAuthenticated: (auth) => {
    localStorage.setItem('vendetta_auth', String(auth))
    set({ isAuthenticated: auth })
  },
  fetchLogs: async (params = {}) => {
    try {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([k, v]) => {
        if (v) searchParams.set(k, String(v))
      })
      const res = await fetch(`/api/logs?${searchParams.toString()}`)
      const data = await res.json()
      set({ logs: data.logs || [], totalLogs: data.total || 0 })
    } catch (e) {
      console.error('Error fetching logs', e)
    }
  },
}))
