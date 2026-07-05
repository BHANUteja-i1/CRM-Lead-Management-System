import React from 'react'

/**
 * Button Component
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'btn-primary focus:ring-blue-500',
    secondary: 'btn-secondary focus:ring-slate-400',
    danger: 'px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-red-500',
    ghost: 'px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700',
  }

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}

/**
 * Input Component with forwardRef for react-hook-form compatibility
 */
export const Input = React.forwardRef(({
  label,
  error,
  type = 'text',
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && <label className="label">{label}</label>}
      <input
        ref={ref}
        type={type}
        className={`input ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </div>
  )
})

/**
 * Select Component with forwardRef for react-hook-form compatibility
 */
export const Select = React.forwardRef(({
  label,
  error,
  options = [],
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && <label className="label">{label}</label>}
      <select
        ref={ref}
        className={`input ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </div>
  )
})

/**
 * Textarea Component with forwardRef for react-hook-form compatibility
 */
export const Textarea = React.forwardRef(({
  label,
  error,
  className = '',
  rows = 4,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && <label className="label">{label}</label>}
      <textarea
        ref={ref}
        rows={rows}
        className={`input resize-none ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </div>
  )
})

/**
 * Card Component
 */
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  )
}

/**
 * Badge Component
 */
export const Badge = ({ children, variant = 'primary', className = '' }) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  )
}

/**
 * Loading Spinner
 */
export const Spinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className={`${sizes[size]} border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin`} />
  )
}

/**
 * Loading Skeleton
 */
export const Skeleton = ({ className = '' }) => {
  return <div className={`skeleton ${className}`} />
}
