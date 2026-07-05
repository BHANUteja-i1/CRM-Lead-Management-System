import Lead from '../models/Lead.js'
import Admin from '../models/Admin.js'
import { sequelize } from '../config/database.js'
import { Op } from 'sequelize'

/**
 * Create a new lead
 */
export const createLead = async (leadData) => {
  try {
    // Verify assigned admin exists
    const admin = await Admin.findByPk(leadData.adminId)
    if (!admin) {
      const error = new Error('Assigned admin not found')
      error.statusCode = 404
      throw error
    }

    const leadPayload = {
      ...leadData,
      notes: [],
    }

    if (leadData.notes && typeof leadData.notes === 'string' && leadData.notes.trim()) {
      leadPayload.notes = [
        {
          id: Date.now().toString(),
          content: leadData.notes.trim(),
          authorId: leadData.adminId,
          createdAt: new Date().toISOString(),
        },
      ]
    }

    const lead = await Lead.create(leadPayload)

    // Reload with associations
    const leadWithAssoc = await Lead.findByPk(lead.id, {
      include: [{ association: 'assignedTo', attributes: ['id', 'name', 'email'] }],
    })

    return {
      success: true,
      lead: leadWithAssoc,
    }
  } catch (error) {
    throw error
  }
}

/**
 * Get all leads with filters, search, and sorting
 */
export const getAllLeads = async (query = {}) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status = '',
      source = '',
      priority = '',
      startDate = '',
      endDate = '',
      sortBy = '-createdAt',
      sortOrder = 'DESC',
    } = query

    const where = {}
    const order = []

    // Search filter
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { company: { [Op.like]: `%${search}%` } },
      ]
    }

    // Status filter
    if (status) {
      where.status = status
    }

    // Source filter
    if (source) {
      where.source = source
    }

    // Priority filter
    if (priority) {
      where.priority = priority
    }

    // Date range filter
    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) {
        where.createdAt[Op.gte] = new Date(startDate)
      }
      if (endDate) {
        const endDateObj = new Date(endDate)
        endDateObj.setHours(23, 59, 59, 999)
        where.createdAt[Op.lte] = endDateObj
      }
    }

    // Sorting
    const validSortFields = ['name', 'email', 'status', 'priority', 'createdAt', 'value']
    let sortField = sortBy
    let sortDir = sortOrder === 'ASC' ? 'ASC' : 'DESC'

    if (typeof sortBy === 'string' && sortBy.startsWith('-')) {
      sortField = sortBy.slice(1)
      sortDir = 'DESC'
    } else if (typeof sortBy === 'string' && sortBy.startsWith('+')) {
      sortField = sortBy.slice(1)
      sortDir = 'ASC'
    }

    sortField = validSortFields.includes(sortField) ? sortField : 'createdAt'
    order.push([sortField, sortDir])

    const offset = (page - 1) * limit

    const { count, rows } = await Lead.findAndCountAll({
      where,
      include: [{ association: 'assignedTo', attributes: ['id', 'name', 'email'] }],
      order,
      offset,
      limit: parseInt(limit),
    })

    return {
      success: true,
      leads: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    }
  } catch (error) {
    throw error
  }
}

/**
 * Get single lead by ID
 */
export const getLeadById = async (leadId) => {
  try {
    const lead = await Lead.findByPk(leadId, {
      include: [{ association: 'assignedTo', attributes: ['id', 'name', 'email'] }],
    })

    if (!lead) {
      const error = new Error('Lead not found')
      error.statusCode = 404
      throw error
    }

    return {
      success: true,
      lead,
    }
  } catch (error) {
    throw error
  }
}

/**
 * Update lead
 */
export const updateLead = async (leadId, updateData) => {
  try {
    const lead = await Lead.findByPk(leadId)

    if (!lead) {
      const error = new Error('Lead not found')
      error.statusCode = 404
      throw error
    }

    // Update only allowed fields
    const allowedFields = ['name', 'email', 'phone', 'company', 'source', 'status', 'priority', 'adminId', 'lastContactDate', 'value', 'expectedCloseDate']
    const updateValues = {}
    allowedFields.forEach((field) => {
      if (updateData[field] !== undefined) {
        updateValues[field] = updateData[field]
      }
    })

    await lead.update(updateValues)

    // Reload with associations
    const updatedLead = await Lead.findByPk(leadId, {
      include: [{ association: 'assignedTo', attributes: ['id', 'name', 'email'] }],
    })

    return {
      success: true,
      lead: updatedLead,
    }
  } catch (error) {
    throw error
  }
}

/**
 * Delete lead
 */
export const deleteLead = async (leadId) => {
  try {
    const lead = await Lead.findByPk(leadId)

    if (!lead) {
      const error = new Error('Lead not found')
      error.statusCode = 404
      throw error
    }

    await lead.destroy()

    return {
      success: true,
      message: 'Lead deleted successfully',
    }
  } catch (error) {
    throw error
  }
}

/**
 * Add note to lead
 */
export const addNoteToLead = async (leadId, noteData) => {
  try {
    const lead = await Lead.findByPk(leadId)

    if (!lead) {
      const error = new Error('Lead not found')
      error.statusCode = 404
      throw error
    }

    const notes = Array.isArray(lead.notes) ? lead.notes : JSON.parse(lead.notes || '[]')
    const newNote = {
      id: Date.now().toString(),
      content: noteData.content,
      authorId: noteData.authorId,
      createdAt: new Date().toISOString(),
    }

    notes.push(newNote)
    // Persist notes explicitly via raw UPDATE to ensure JSON stored correctly in SQLite
    await sequelize.query('UPDATE Leads SET notes = ? WHERE id = ?', {
      replacements: [JSON.stringify(notes), leadId],
    })

    // Reload with associations
    const updatedLead = await Lead.findByPk(leadId, {
      include: [{ association: 'assignedTo', attributes: ['id', 'name', 'email'] }],
    })

    return {
      success: true,
      lead: updatedLead,
    }
  } catch (error) {
    throw error
  }
}

/**
 * Update note in lead
 */
export const updateNoteInLead = async (leadId, noteId, noteData) => {
  try {
    const lead = await Lead.findByPk(leadId)

    if (!lead) {
      const error = new Error('Lead not found')
      error.statusCode = 404
      throw error
    }

    const notes = Array.isArray(lead.notes) ? lead.notes : JSON.parse(lead.notes || '[]')
    const noteIndex = notes.findIndex((n) => n.id === noteId)

    if (noteIndex === -1) {
      const error = new Error('Note not found')
      error.statusCode = 404
      throw error
    }

    notes[noteIndex].content = noteData.content
    await sequelize.query('UPDATE Leads SET notes = ? WHERE id = ?', {
      replacements: [JSON.stringify(notes), leadId],
    })

    // Reload with associations
    const updatedLead = await Lead.findByPk(leadId, {
      include: [{ association: 'assignedTo', attributes: ['id', 'name', 'email'] }],
    })

    return {
      success: true,
      lead: updatedLead,
    }
  } catch (error) {
    throw error
  }
}

/**
 * Delete note from lead
 */
export const deleteNoteFromLead = async (leadId, noteId) => {
  try {
    const lead = await Lead.findByPk(leadId)

    if (!lead) {
      const error = new Error('Lead not found')
      error.statusCode = 404
      throw error
    }

    const notes = Array.isArray(lead.notes) ? lead.notes : JSON.parse(lead.notes || '[]')
    const noteIndex = notes.findIndex((n) => n.id === noteId)

    if (noteIndex === -1) {
      const error = new Error('Note not found')
      error.statusCode = 404
      throw error
    }

    notes.splice(noteIndex, 1)
    await sequelize.query('UPDATE Leads SET notes = ? WHERE id = ?', {
      replacements: [JSON.stringify(notes), leadId],
    })

    // Reload with associations
    const updatedLead = await Lead.findByPk(leadId, {
      include: [{ association: 'assignedTo', attributes: ['id', 'name', 'email'] }],
    })

    return {
      success: true,
      lead: updatedLead,
    }
  } catch (error) {
    throw error
  }
}

/**
 * Get dashboard analytics
 */
export const getDashboardAnalytics = async () => {
  try {
    const totalLeads = await Lead.count()
    const newLeads = await Lead.count({ where: { status: 'New' } })
    const contactedLeads = await Lead.count({ where: { status: 'Contacted' } })
    const qualifiedLeads = await Lead.count({ where: { status: 'Qualified' } })
    const convertedLeads = await Lead.count({ where: { status: 'Converted' } })
    const closedLeads = await Lead.count({ where: { status: 'Closed' } })

    const conversionRate =
      totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(2) : 0

    // Leads by status
    const leadsByStatus = {
      New: newLeads,
      Contacted: contactedLeads,
      Qualified: qualifiedLeads,
      Converted: convertedLeads,
      Closed: closedLeads,
    }

    // Leads by priority
    const highPriority = await Lead.count({ where: { priority: 'High' } })
    const mediumPriority = await Lead.count({ where: { priority: 'Medium' } })
    const lowPriority = await Lead.count({ where: { priority: 'Low' } })

    const leadsByPriority = {
      High: highPriority,
      Medium: mediumPriority,
      Low: lowPriority,
    }

    // Leads by source
    const sources = ['Website', 'Email', 'Phone', 'Social Media', 'Referral', 'Advertisement']
    const leadsBySource = {}

    for (const source of sources) {
      leadsBySource[source] = await Lead.count({ where: { source } })
    }

    // Monthly leads (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyLeadsRaw = await Lead.findAll({
      attributes: [
        [sequelize.fn('strftime', '%Y-%m', sequelize.col('createdAt')), 'month'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      where: {
        createdAt: {
          [Op.gte]: sixMonthsAgo,
        },
      },
      group: [sequelize.fn('strftime', '%Y-%m', sequelize.col('createdAt'))],
      order: [[sequelize.fn('strftime', '%Y-%m', sequelize.col('createdAt')), 'ASC']],
      raw: true,
    })

    const monthlyLeads = monthlyLeadsRaw.map((item) => ({
      month: item.month,
      count: parseInt(item.count),
    }))

    return {
      success: true,
      analytics: {
        summary: {
          totalLeads,
          newLeads,
          contactedLeads,
          qualifiedLeads,
          convertedLeads,
          closedLeads,
          conversionRate: `${conversionRate}%`,
        },
        leadsByStatus,
        leadsByPriority,
        leadsBySource,
        monthlyLeads,
      },
    }
  } catch (error) {
    throw error
  }
}
