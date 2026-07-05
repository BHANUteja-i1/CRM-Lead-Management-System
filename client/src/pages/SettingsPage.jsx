import React from 'react'
import { useForm } from 'react-hook-form'
import { Layout } from '../layouts/MainLayout'
import { Button, Input, Card } from '../components/ui/FormElements'
import { useAuthStore } from '../stores'
import { authAPI } from '../services/api'
import toast from 'react-hot-toast'

/**
 * Settings Page
 */
export const SettingsPage = () => {
  const { admin } = useAuthStore()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: admin?.name || '',
      email: admin?.email || '',
    },
  })
  const [isLoading, setIsLoading] = React.useState(false)

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      await authAPI.updateProfile(data)
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Settings */}
        <Card>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            Profile Information
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
            <Input
              label="Full Name"
              placeholder="Your name"
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              {...register('email', { required: 'Email is required' })}
              error={errors.email?.message}
            />

            <div className="pt-4">
              <Button type="submit" variant="primary" loading={isLoading}>
                Save Changes
              </Button>
            </div>
          </form>
        </Card>

        {/* Account Info */}
        <Card>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            Account Information
          </h2>

          <div className="space-y-4 max-w-2xl">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Role</p>
              <p className="text-base font-medium text-slate-900 dark:text-white capitalize">
                {admin?.role || 'N/A'}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Status</p>
              <p className="text-base font-medium text-slate-900 dark:text-white">
                <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                  Active
                </span>
              </p>
            </div>

            {admin?.lastLogin && (
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Last Login</p>
                <p className="text-base font-medium text-slate-900 dark:text-white">
                  {new Date(admin.lastLogin).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Security */}
        <Card>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            Security
          </h2>

          <div className="space-y-4 max-w-2xl">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Your password is securely encrypted and stored. We recommend changing your password
              regularly for your account security.
            </p>

            <Button variant="secondary">
              Change Password
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
