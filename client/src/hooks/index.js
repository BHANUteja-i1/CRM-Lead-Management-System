import { useState } from 'react'
import { authAPI, leadsAPI, notesAPI } from '../services/api'
import { useAuthStore } from '../stores'
import toast from 'react-hot-toast'

/**
 * Custom hook for authentication
 */
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { setAdmin, clearAuth } = useAuthStore()

  const register = async (data) => {
    try {
      setIsLoading(true)
      const response = await authAPI.register(data)
      setAdmin(response.data.data.admin, response.data.data.token)
      toast.success('Registration successful!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (data) => {
    try {
      setIsLoading(true)
      const response = await authAPI.login(data)
      setAdmin(response.data.data.admin, response.data.data.token)
      toast.success('Login successful!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      await authAPI.logout()
      clearAuth()
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Logout failed')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    register,
    login,
    logout,
    isLoading,
  }
}

/**
 * Custom hook for leads
 */
export const useLeads = () => {
  const [isLoading, setIsLoading] = useState(false)

  const getLeads = async (params) => {
    try {
      setIsLoading(true)
      const response = await leadsAPI.getAll(params)
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch leads')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const getLeadById = async (id) => {
    try {
      setIsLoading(true)
      const response = await leadsAPI.getById(id)
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch lead')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const createLead = async (data) => {
    try {
      setIsLoading(true)
      const response = await leadsAPI.create(data)
      toast.success('Lead created successfully!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create lead'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateLead = async (id, data) => {
    try {
      setIsLoading(true)
      const response = await leadsAPI.update(id, data)
      toast.success('Lead updated successfully!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update lead'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const deleteLead = async (id) => {
    try {
      setIsLoading(true)
      const response = await leadsAPI.delete(id)
      toast.success('Lead deleted successfully!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete lead'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const addNote = async (leadId, data) => {
    try {
      setIsLoading(true)
      const response = await notesAPI.add(leadId, data)
      toast.success('Note added successfully!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add note'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateNote = async (leadId, noteId, data) => {
    try {
      setIsLoading(true)
      const response = await notesAPI.update(leadId, noteId, data)
      toast.success('Note updated successfully!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update note'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const deleteNote = async (leadId, noteId) => {
    try {
      setIsLoading(true)
      const response = await notesAPI.delete(leadId, noteId)
      toast.success('Note deleted successfully!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete note'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    getLeads,
    getLeadById,
    createLead,
    updateLead,
    deleteLead,
    addNote,
    updateNote,
    deleteNote,
    isLoading,
  }
}
