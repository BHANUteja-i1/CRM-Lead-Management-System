import * as leadService from "../services/leadService.js";
import { successResponse, errorResponse } from "../utils/helpers.js";
import { validateLeadData } from "../utils/validation.js";

/**
 * @route   GET /api/leads
 * @desc    Get all leads with filters, search, and sorting
 * @access  Private
 */
export const getLeads = async (req, res, next) => {
  try {
    const result = await leadService.getAllLeads(req.query);
    res.status(200).json({
      success: true,
      message: "Leads retrieved successfully",
      data: result.leads,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/leads/:id
 * @desc    Get single lead
 * @access  Private
 */
export const getLead = async (req, res, next) => {
  try {
    const result = await leadService.getLeadById(req.params.id);
    successResponse(res, 200, "Lead retrieved successfully", result.lead);
  } catch (error) {
    if (error.statusCode === 404) {
      return errorResponse(res, 404, error.message);
    }
    next(error);
  }
};

/**
 * @route   POST /api/leads
 * @desc    Create new lead
 * @access  Private
 */
export const createLead = async (req, res, next) => {
  try {
    const validation = validateLeadData(req.body)

    if (!validation.isValid) {
      return errorResponse(res, 400, 'Validation error', validation.errors)
    }

    const leadData = {
      ...req.body,
      adminId: req.body.adminId || req.body.assignedTo || req.admin.id,
    }

    const result = await leadService.createLead(leadData)
    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: result.lead,
    })
  } catch (error) {
    if (error.statusCode === 404) {
      return errorResponse(res, 404, error.message)
    }
    next(error)
  }
}

/**
 * @route   PUT /api/leads/:id
 * @desc    Update lead
 * @access  Private
 */
export const updateLead = async (req, res, next) => {
  try {
    const result = await leadService.updateLead(req.params.id, req.body);
    successResponse(res, 200, "Lead updated successfully", result.lead);
  } catch (error) {
    if (error.statusCode === 404) {
      return errorResponse(res, 404, error.message);
    }
    next(error);
  }
};

/**
 * @route   DELETE /api/leads/:id
 * @desc    Delete lead
 * @access  Private
 */
export const deleteLead = async (req, res, next) => {
  try {
    const result = await leadService.deleteLead(req.params.id);
    successResponse(res, 200, result.message);
  } catch (error) {
    if (error.statusCode === 404) {
      return errorResponse(res, 404, error.message);
    }
    next(error);
  }
};

/**
 * @route   POST /api/leads/:id/note
 * @desc    Add note to lead
 * @access  Private
 */
export const addNote = async (req, res, next) => {
  try {
    const { content } = req.body

    if (!content || content.trim() === '') {
      return errorResponse(res, 400, 'Note content is required')
    }

    const noteData = {
      content,
      authorId: req.admin.id,
    }

    const result = await leadService.addNoteToLead(req.params.id, noteData)
    res.status(201).json({
      success: true,
      message: 'Note added successfully',
      data: result.lead,
    })
  } catch (error) {
    if (error.statusCode === 404) {
      return errorResponse(res, 404, error.message)
    }
    next(error)
  }
}

/**
 * @route   PUT /api/leads/:leadId/note/:noteId
 * @desc    Update note
 * @access  Private
 */
export const updateNote = async (req, res, next) => {
  try {
    const { leadId, noteId } = req.params;
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return errorResponse(res, 400, "Note content is required");
    }

    const result = await leadService.updateNoteInLead(leadId, noteId, {
      content,
    });

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: result.lead,
    });
  } catch (error) {
    if (error.statusCode === 404) {
      return errorResponse(res, 404, error.message);
    }
    next(error);
  }
};

/**
 * @route   DELETE /api/leads/:leadId/note/:noteId
 * @desc    Delete note
 * @access  Private
 */
export const deleteNote = async (req, res, next) => {
  try {
    const { leadId, noteId } = req.params;

    const result = await leadService.deleteNoteFromLead(leadId, noteId);

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: result.lead,
    });
  } catch (error) {
    if (error.statusCode === 404) {
      return errorResponse(res, 404, error.message);
    }
    next(error);
  }
};

/**
 * @route   GET /api/dashboard
 * @desc    Get dashboard analytics
 * @access  Private
 */
export const getDashboard = async (req, res, next) => {
  try {
    const result = await leadService.getDashboardAnalytics();
    res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data: result.analytics,
    });
  } catch (error) {
    next(error);
  }
};
