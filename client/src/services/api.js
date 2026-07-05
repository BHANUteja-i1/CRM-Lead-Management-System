import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Add token to requests
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * Handle responses and errors
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ============== Authentication ==============

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  logout: () => api.post('/auth/logout'),
  getAllAdmins: () => api.get('/auth/admins'),
}

// ============== Leads ==============

export const leadsAPI = {
  getAll: (params) => api.get('/leads', { params }),
  getById: (id) => api.get(`/leads/${id}`),
  create: (data) => api.post('/leads', data),
  update: (id, data) => api.put(`/leads/${id}`, data),
  delete: (id) => api.delete(`/leads/${id}`),
}

// ============== Notes ==============

export const notesAPI = {
  add: (leadId, data) => api.post(`/leads/${leadId}/note`, data),
  update: (leadId, noteId, data) => api.put(`/leads/${leadId}/note/${noteId}`, data),
  delete: (leadId, noteId) => api.delete(`/leads/${leadId}/note/${noteId}`),
}

// ============== Dashboard ==============

export const dashboardAPI = {
  getAnalytics: () => api.get('/dashboard'),
}

export default api
