import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks'
import { Button, Input } from '../components/ui/FormElements'
import { validateEmail, validatePassword } from '../utils/helpers'

/**
 * Login Page
 */
export const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      await login(data)
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl mb-4">
            CRM
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Sign in to your CRM account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email"
            type="email"
            placeholder="admin@example.com"
            {...register('email', {
              required: 'Email is required',
              validate: (value) => validateEmail(value) || 'Invalid email format',
            })}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register('password', {
              required: 'Password is required',
              validate: (value) => validatePassword(value) || 'Password must be at least 6 characters',
            })}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            loading={isLoading}
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

/**
 * Register Page
 */
export const RegisterPage = () => {
  const navigate = useNavigate()
  const { register: registerUser, isLoading } = useAuth()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      await registerUser(data)
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl mb-4">
            CRM
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Create Account</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Join our CRM platform today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
            error={errors.name?.message}
          />

          <Input
            label="Email"
            type="email"
            placeholder="admin@example.com"
            {...register('email', {
              required: 'Email is required',
              validate: (value) => validateEmail(value) || 'Invalid email format',
            })}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register('password', {
              required: 'Password is required',
              validate: (value) => validatePassword(value) || 'Password must be at least 6 characters',
            })}
            error={errors.password?.message}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            })}
            error={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            loading={isLoading}
          >
            Create Account
          </Button>
        </form>

        <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
