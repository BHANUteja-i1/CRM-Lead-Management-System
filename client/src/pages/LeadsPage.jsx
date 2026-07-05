import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'
import { Layout } from '../layouts/MainLayout'
import { Button, Input, Select, Textarea } from '../components/ui/FormElements'
import { Card } from '../components/ui/FormElements'
import { Modal } from '../components/ui/Modal'
import { useLeads } from '../hooks'
import { useLeadsStore } from '../stores'
import { authAPI } from '../services/api'
import toast from 'react-hot-toast'

/**
 * Lead Form Modal
 */
const LeadFormModal = ({ isOpen, onClose, lead = null, onSuccess }) => {
  const { createLead, updateLead, isLoading } = useLeads()
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm()
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await authAPI.getAllAdmins()
        setAdmins(response.data.data || [])
      } catch (error) {
        console.error(error)
      }
    }
    fetchAdmins()
  }, [])

  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        source: lead.source,
        status: lead.status,
        priority: lead.priority,
        adminId: lead.assignedTo?.id || lead.adminId,
        notes: '',
      })
    } else {
      reset()
    }
  }, [lead, reset])

  const onSubmit = async (data) => {
    try {
      if (lead) {
        await updateLead(lead.id, data)
      } else {
        await createLead(data)
      }
      onSuccess()
      onClose()
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose()
        reset()
      }}
      title={lead ? 'Edit Lead' : 'Add New Lead'}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Name"
            placeholder="Lead name"
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          />
          <Input
            label="Email"
            type="email"
            placeholder="email@example.com"
            {...register('email', { required: 'Email is required' })}
            error={errors.email?.message}
          />
          <Input
            label="Phone"
            placeholder="+1 (555) 123-4567"
            {...register('phone', { required: 'Phone is required' })}
            error={errors.phone?.message}
          />
          <Input
            label="Company"
            placeholder="Company name"
            {...register('company', { required: 'Company is required' })}
            error={errors.company?.message}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Select
            label="Source"
            options={[
              { value: 'Website', label: 'Website' },
              { value: 'Email', label: 'Email' },
              { value: 'Phone', label: 'Phone' },
              { value: 'Social Media', label: 'Social Media' },
              { value: 'Referral', label: 'Referral' },
              { value: 'Advertisement', label: 'Advertisement' },
            ]}
            {...register('source')}
          />
          <Select
            label="Status"
            options={[
              { value: 'New', label: 'New' },
              { value: 'Contacted', label: 'Contacted' },
              { value: 'Qualified', label: 'Qualified' },
              { value: 'Converted', label: 'Converted' },
              { value: 'Closed', label: 'Closed' },
            ]}
            {...register('status')}
          />
          <Select
            label="Priority"
            options={[
              { value: 'Low', label: 'Low' },
              { value: 'Medium', label: 'Medium' },
              { value: 'High', label: 'High' },
            ]}
            {...register('priority')}
          />
        </div>

        <Select
          label="Assign To"
          options={admins.map((admin) => ({
            value: admin.id,
            label: admin.name,
          }))}
          {...register('adminId', { required: 'Must assign to an admin' })}
          error={errors.adminId?.message}
        />

        <Textarea
          label="Notes"
          placeholder="Add any additional notes..."
          {...register('notes')}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              onClose()
              reset()
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={isLoading}>
            {lead ? 'Update Lead' : 'Add Lead'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

/**
 * Leads Page
 */
export const LeadsPage = () => {
  const { getLeads, deleteLead, addNote, updateNote, deleteNote } = useLeads()
  const { leads, setLeads, pagination, setPagination, searchFilters, setSearchFilters } = useLeadsStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState(null)
  const [expandedNotes, setExpandedNotes] = useState({})
  const [noteInputs, setNoteInputs] = useState({})
  const [editingNote, setEditingNote] = useState({ leadId: null, noteId: null, content: '' })

  const fetchLeads = async (params = {}) => {
    try {
      setIsLoading(true)
      const response = await getLeads(params)
      setLeads(response.data || [])
      setPagination(response.pagination || {})
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads({
      ...searchFilters,
      page: pagination.page,
      limit: pagination.limit || 10,
    })
  }, [])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchFilters({ ...searchFilters, search: value })
  }

  const handleFilterChange = (key, value) => {
    setSearchFilters({ ...searchFilters, [key]: value })
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setSelectedLead(null)
  }

  const handleFormSuccess = () => {
    fetchLeads(searchFilters)
  }

  const toggleNotes = (leadId) => {
    setExpandedNotes((prev) => ({ ...prev, [leadId]: !prev[leadId] }))
  }

  const handleNoteChange = (leadId, noteId, value) => {
    setNoteInputs((prev) => ({
      ...prev,
      [leadId]: {
        ...prev[leadId],
        [noteId]: value,
      },
    }))
  }

  const startEditingNote = (leadId, note) => {
    setEditingNote({ leadId, noteId: note.id, content: note.content })
    setNoteInputs((prev) => ({
      ...prev,
      [leadId]: {
        ...prev[leadId],
        [note.id]: note.content,
      },
    }))
  }

  const cancelEditingNote = () => {
    setEditingNote({ leadId: null, noteId: null, content: '' })
  }

  const saveNote = async (leadId, noteId) => {
    try {
      const content = noteInputs[leadId]?.[noteId]?.trim()
      if (!content) {
        toast.error('Note content cannot be empty')
        return
      }
      await updateNote(leadId, noteId, { content })
      fetchLeads(searchFilters)
      cancelEditingNote()
    } catch (error) {
      console.error(error)
    }
  }

  const removeNote = async (leadId, noteId) => {
    try {
      await deleteNote(leadId, noteId)
      fetchLeads(searchFilters)
    } catch (error) {
      console.error(error)
    }
  }

  const addNoteToLead = async (leadId) => {
    try {
      const content = noteInputs[leadId]?.newNote?.trim()
      if (!content) {
        toast.error('Note content cannot be empty')
        return
      }
      await addNote(leadId, { content })
      setNoteInputs((prev) => ({
        ...prev,
        [leadId]: {
          ...prev[leadId],
          newNote: '',
        },
      }))
      fetchLeads(searchFilters)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Leads</h1>
          <Button
            variant="primary"
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2"
          >
            <FiPlus size={20} />
            Add Lead
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              placeholder="Search by name, email, or company..."
              onChange={handleSearch}
            />
            <Select
              options={[
                { value: '', label: 'All Status' },
                { value: 'New', label: 'New' },
                { value: 'Contacted', label: 'Contacted' },
                { value: 'Qualified', label: 'Qualified' },
                { value: 'Converted', label: 'Converted' },
                { value: 'Closed', label: 'Closed' },
              ]}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            />
            <Select
              options={[
                { value: '', label: 'All Priority' },
                { value: 'Low', label: 'Low' },
                { value: 'Medium', label: 'Medium' },
                { value: 'High', label: 'High' },
              ]}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
            />
            <Select
              options={[
                { value: '-createdAt', label: 'Newest First' },
                { value: 'createdAt', label: 'Oldest First' },
                { value: 'name', label: 'Alphabetical' },
              ]}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            />
            <Button
              variant="secondary"
              onClick={() => fetchLeads(searchFilters)}
            >
              Search
            </Button>
          </div>
        </Card>

        {/* Leads List */}
        <Card>
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : leads.length > 0 ? (
            <div className="space-y-4">
              {leads.map((lead) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white">{lead.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{lead.email}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{lead.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setSelectedLead(lead)
                          setIsFormOpen(true)
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={async () => {
                          try {
                            await deleteLead(lead.id)
                            fetchLeads(searchFilters)
                          } catch (error) {
                            console.error(error)
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        Notes ({lead.notes?.length || 0})
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toggleNotes(lead.id)}
                      >
                        {expandedNotes[lead.id] ? 'Hide Notes' : 'Show Notes'}
                      </Button>
                    </div>

                    {expandedNotes[lead.id] && (
                      <div className="mt-4 space-y-4">
                        {lead.notes && lead.notes.length > 0 ? (
                          lead.notes.map((note) => (
                            <div
                              key={note.id}
                              className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="space-y-2">
                                  <p className="text-sm text-slate-700 dark:text-slate-200">{note.content}</p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Created by {note.authorId} • {new Date(note.createdAt).toLocaleString()}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    size="xs"
                                    variant="secondary"
                                    onClick={() => startEditingNote(lead.id, note)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    size="xs"
                                    variant="danger"
                                    onClick={async () => removeNote(lead.id, note.id)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>

                              {editingNote.leadId === lead.id && editingNote.noteId === note.id && (
                                <div className="mt-3 space-y-2">
                                  <Textarea
                                    label="Edit note"
                                    value={noteInputs[lead.id]?.[note.id] || ''}
                                    onChange={(e) => handleNoteChange(lead.id, note.id, e.target.value)}
                                  />
                                  <div className="flex gap-2 justify-end">
                                    <Button size="sm" variant="secondary" onClick={cancelEditingNote}>
                                      Cancel
                                    </Button>
                                    <Button size="sm" variant="primary" onClick={() => saveNote(lead.id, note.id)}>
                                      Save
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-slate-500 dark:text-slate-400">No notes yet.</div>
                        )}

                        <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-950">
                          <Textarea
                            label="Add new note"
                            value={noteInputs[lead.id]?.newNote || ''}
                            onChange={(e) => handleNoteChange(lead.id, 'newNote', e.target.value)}
                          />
                          <div className="flex justify-end">
                            <Button size="sm" variant="primary" onClick={() => addNoteToLead(lead.id)}>
                              Add Note
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              No leads found
            </div>
          )}
        </Card>
      </div>

      {/* Form Modal */}
      <LeadFormModal
        isOpen={isFormOpen}
        onClose={handleFormClose}
        lead={selectedLead}
        onSuccess={handleFormSuccess}
      />
    </Layout>
  )
}
