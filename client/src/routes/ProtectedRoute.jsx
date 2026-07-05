import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores'

/**
 * Protected Route Component
 */
export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { token } = useAuthStore()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true })
    }
    setIsChecking(false)
  }, [token, navigate])

  if (isChecking) {
    return <div>Loading...</div>
  }

  return token ? children : null
}

/**
 * Public Route Component
 */
export const PublicRoute = ({ children }) => {
  const navigate = useNavigate()
  const { token } = useAuthStore()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (token) {
      navigate('/dashboard', { replace: true })
    }
    setIsChecking(false)
  }, [token, navigate])

  if (isChecking) {
    return <div>Loading...</div>
  }

  return !token ? children : null
}
