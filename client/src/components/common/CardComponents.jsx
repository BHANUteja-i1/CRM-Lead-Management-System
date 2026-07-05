import React from 'react'
import { motion } from 'framer-motion'

/**
 * Stats Card
 */
export const StatsCard = ({ icon: Icon, label, value, trend, color = 'primary' }) => {
  const colors = {
    primary: 'from-blue-500 to-blue-600',
    success: 'from-green-500 to-green-600',
    warning: 'from-yellow-500 to-yellow-600',
    error: 'from-red-500 to-red-600',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${colors[color]} rounded-xl shadow-lg p-6 text-white`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white text-opacity-80 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {trend && (
            <p className={`text-xs mt-2 ${trend > 0 ? 'text-green-200' : 'text-red-200'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className="bg-white bg-opacity-20 p-3 rounded-lg">
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Info Card
 */
export const InfoCard = ({ title, value, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-slate-800 rounded-lg shadow p-6"
    >
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{value}</p>
      {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
    </motion.div>
  )
}

/**
 * Breadcrumb
 */
export const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center gap-2 mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-slate-400">/</span>}
          {item.href ? (
            <a href={item.href} className="text-blue-600 hover:underline">
              {item.label}
            </a>
          ) : (
            <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
