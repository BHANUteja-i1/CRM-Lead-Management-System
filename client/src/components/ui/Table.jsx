import React from 'react'
import { motion } from 'framer-motion'
import { Skeleton } from './FormElements'

/**
 * Table Component
 */
export const Table = ({ children, className = '' }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse ${className}`}>
        {children}
      </table>
    </div>
  )
}

/**
 * Table Header
 */
export const TableHead = ({ children, className = '' }) => {
  return (
    <thead className={`bg-slate-100 dark:bg-slate-700 ${className}`}>
      {children}
    </thead>
  )
}

/**
 * Table Body
 */
export const TableBody = ({ children, className = '' }) => {
  return <tbody className={className}>{children}</tbody>
}

/**
 * Table Row
 */
export const TableRow = ({ children, className = '' }) => {
  return (
    <tr className={`border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${className}`}>
      {children}
    </tr>
  )
}

/**
 * Table Cell
 */
export const TableCell = ({ children, className = '' }) => {
  return (
    <td className={`px-4 py-3 text-sm ${className}`}>
      {children}
    </td>
  )
}

/**
 * Table Header Cell
 */
export const TableHeaderCell = ({ children, className = '' }) => {
  return (
    <th className={`px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300 ${className}`}>
      {children}
    </th>
  )
}

/**
 * Table Loading Skeleton
 */
export const TableSkeleton = ({ rows = 5, columns = 6 }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {[...Array(columns)].map((_, i) => (
            <TableHeaderCell key={i}>
              <Skeleton className="h-4 w-20" />
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {[...Array(rows)].map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {[...Array(columns)].map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

/**
 * Pagination Component
 */
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const pages = []
  const maxVisible = 5

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= maxVisible; i++) {
        pages.push(i)
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i)
      }
    }
  }

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border border-slate-300 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        Previous
      </button>

      {pages.map((page, i) => {
        if (i > 0 && pages[i - 1] !== page - 1) {
          return (
            <span key={`ellipsis-${i}`} className="px-2 py-1">
              ...
            </span>
          )
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded transition-colors ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {page}
          </button>
        )
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border border-slate-300 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        Next
      </button>
    </div>
  )
}

/**
 * Empty State
 */
export const EmptyState = ({ icon: Icon, title, description, action = null }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {Icon && <Icon className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />}
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md mb-6">
        {description}
      </p>
      {action}
    </div>
  )
}
