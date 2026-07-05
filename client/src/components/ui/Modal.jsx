import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './FormElements'
import { FiX } from 'react-icons/fi'

/**
 * Modal Component
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footerContent = null,
  size = 'md',
}) => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`bg-white dark:bg-slate-800 rounded-xl shadow-2xl ${sizes[size]} w-full mx-4 pointer-events-auto`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">{children}</div>

              {/* Footer */}
              {footerContent && (
                <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                  {footerContent}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

/**
 * Confirmation Dialog
 */
export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
  isDanger = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footerContent={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={isDanger ? 'danger' : 'primary'}
            onClick={onConfirm}
            loading={isLoading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="text-slate-600 dark:text-slate-400">{message}</p>
    </Modal>
  )
}

/**
 * Toast Container
 */
export const ToastContainer = () => {
  return <div className="fixed top-4 right-4 z-50" />
}
