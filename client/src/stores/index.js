import { create } from 'zustand'

/**
 * Auth Store
 */
export const useAuthStore = create((set) => ({
  admin: localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null,
  token: localStorage.getItem('token') || null,
  isLoading: false,

  setAdmin: (admin, token) => {
    if (admin && token) {
      localStorage.setItem('admin', JSON.stringify(admin))
      localStorage.setItem('token', token)
    }
    set({ admin, token })
  },

  clearAuth: () => {
    localStorage.removeItem('admin')
    localStorage.removeItem('token')
    set({ admin: null, token: null })
  },

  setLoading: (isLoading) => set({ isLoading }),
}))

/**
 * Leads Store
 */
export const useLeadsStore = create((set) => ({
  leads: [],
  selectedLead: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  isLoading: false,
  searchFilters: {
    search: '',
    status: '',
    source: '',
    priority: '',
    startDate: '',
    endDate: '',
    sortBy: '-createdAt',
  },

  setLeads: (leads) => set({ leads }),
  setSelectedLead: (selectedLead) => set({ selectedLead }),
  setPagination: (pagination) => set({ pagination }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSearchFilters: (searchFilters) => set({ searchFilters }),

  reset: () =>
    set({
      leads: [],
      selectedLead: null,
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      isLoading: false,
      searchFilters: {
        search: '',
        status: '',
        source: '',
        priority: '',
        startDate: '',
        endDate: '',
        sortBy: '-createdAt',
      },
    }),
}))

/**
 * Dashboard Store
 */
export const useDashboardStore = create((set) => ({
  analytics: null,
  isLoading: false,

  setAnalytics: (analytics) => set({ analytics }),
  setIsLoading: (isLoading) => set({ isLoading }),
}))

/**
 * Theme Store
 */
export const useThemeStore = create((set) => ({
  isDark: localStorage.getItem('theme') === 'dark',

  toggleTheme: () =>
    set((state) => {
      const newIsDark = !state.isDark
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
      if (newIsDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { isDark: newIsDark }
    }),
}))

/**
 * Modal Store
 */
export const useModalStore = create((set) => ({
  isOpen: false,
  type: null,
  data: null,

  openModal: (type, data = null) => set({ isOpen: true, type, data }),
  closeModal: () => set({ isOpen: false, type: null, data: null }),
}))
