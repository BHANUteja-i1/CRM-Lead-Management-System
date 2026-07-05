/**
 * Format date to readable format
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Format date and time
 */
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Get status badge color
 */
export const getStatusColor = (status) => {
  const colors = {
    New: 'badge-primary',
    Contacted: 'badge-warning',
    Qualified: 'badge-warning',
    Converted: 'badge-success',
    Closed: 'badge-error',
  }
  return colors[status] || 'badge-primary'
}

/**
 * Get priority badge color
 */
export const getPriorityColor = (priority) => {
  const colors = {
    High: 'badge-error',
    Medium: 'badge-warning',
    Low: 'badge-primary',
  }
  return colors[priority] || 'badge-primary'
}

/**
 * Get source badge color
 */
export const getSourceColor = (source) => {
  const colors = {
    Website: 'badge-primary',
    Email: 'badge-warning',
    Phone: 'badge-success',
    'Social Media': 'badge-primary',
    Referral: 'badge-success',
    Advertisement: 'badge-warning',
  }
  return colors[source] || 'badge-primary'
}

/**
 * Validate email
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Validate password (minimum 6 characters)
 */
export const validatePassword = (password) => {
  return password && password.length >= 6
}

/**
 * Validate phone
 */
export const validatePhone = (phone) => {
  const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
  return re.test(phone)
}

/**
 * Format currency
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

/**
 * Truncate text
 */
export const truncateText = (text, length = 50) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}

/**
 * Copy to clipboard
 */
export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
}

/**
 * Calculate lead age
 */
export const calculateLeadAge = (createdAt) => {
  const now = new Date()
  const created = new Date(createdAt)
  const diff = now - created
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.floor(days / 30)}m ago`
  return `${Math.floor(days / 365)}y ago`
}
