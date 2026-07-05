import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi'
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiUser,
  FiMoon,
  FiSun,
} from 'react-icons/fi'
import { useAuthStore, useThemeStore } from '../stores'
import { useAuth } from '../hooks'

/**
 * Sidebar Component
 */
export const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { admin, clearAuth } = useAuthStore()

  const menuItems = [
    {
      label: 'Dashboard',
      icon: FiHome,
      href: '/dashboard',
    },
    {
      label: 'Leads',
      icon: FiUsers,
      href: '/leads',
    },
    {
      label: 'Settings',
      icon: FiSettings,
      href: '/settings',
    },
  ]

  const isActive = (href) => location.pathname === href

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -256 }}
        animate={{ x: isOpen ? 0 : -256 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-screen w-64 bg-gradient-primary text-white shadow-xl z-40 lg:static lg:translate-x-0"
      >
        {/* Logo */}
        <div className="p-6 border-b border-white border-opacity-20">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-primary">
              CRM
            </div>
            <span className="font-bold text-lg">CRM System</span>
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="p-6 space-y-2 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-white bg-opacity-20'
                  : 'hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-6 border-t border-white border-opacity-20 space-y-3">
          <div className="text-sm">
            <p className="font-semibold">{admin?.name}</p>
            <p className="text-white text-opacity-75">{admin?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200"
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  )
}

/**
 * Header Component
 */
export const Header = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useThemeStore()

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-20">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors"
        >
          <FiMenu size={24} />
        </button>

        {/* Title */}
        <h1 className="text-xl font-bold text-slate-900 dark:text-white hidden sm:block">
          CRM Dashboard
        </h1>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors"
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Settings */}
          <Link
            to="/settings"
            className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors"
          >
            <FiSettings size={20} />
          </Link>
        </div>
      </div>
    </header>
  )
}

/**
 * Layout Component
 */
export const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { isDark } = useThemeStore()

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
