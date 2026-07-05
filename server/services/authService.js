import Admin from '../models/Admin.js'
import { generateToken } from '../middleware/auth.js'

/**
 * Register new admin
 */
export const registerAdmin = async (adminData) => {
  try {
    const admin = await Admin.create(adminData)
    const token = generateToken(admin.id)
    return {
      success: true,
      admin: admin.toJSON(),
      token,
    }
  } catch (error) {
    throw error
  }
}

/**
 * Login admin
 */
export const loginAdmin = async (email, password) => {
  try {
    const admin = await Admin.findOne({ where: { email } })

    if (!admin) {
      const error = new Error('Invalid credentials')
      error.statusCode = 401
      throw error
    }

    const isPasswordMatch = await admin.comparePassword(password)

    if (!isPasswordMatch) {
      const error = new Error('Invalid credentials')
      error.statusCode = 401
      throw error
    }

    if (!admin.isActive) {
      const error = new Error('Admin account is inactive')
      error.statusCode = 403
      throw error
    }

    // Update last login
    admin.lastLogin = new Date()
    await admin.save()

    const token = generateToken(admin.id)
    return {
      success: true,
      admin: admin.toJSON(),
      token,
    }
  } catch (error) {
    throw error
  }
}

/**
 * Get admin profile
 */
export const getAdminProfile = async (adminId) => {
  try {
    const admin = await Admin.findByPk(adminId)

    if (!admin) {
      const error = new Error('Admin not found')
      error.statusCode = 404
      throw error
    }

    return {
      success: true,
      admin: admin.toJSON(),
    }
  } catch (error) {
    throw error
  }
}

/**
 * Update admin profile
 */
export const updateAdminProfile = async (adminId, updateData) => {
  try {
    const admin = await Admin.findByPk(adminId)

    if (!admin) {
      const error = new Error('Admin not found')
      error.statusCode = 404
      throw error
    }

    // Only allow specific fields to be updated
    const allowedFields = ['name', 'email']
    const filteredData = {}
    allowedFields.forEach((field) => {
      if (updateData[field] !== undefined) {
        filteredData[field] = updateData[field]
      }
    })

    await admin.update(filteredData)

    return {
      success: true,
      admin: admin.toJSON(),
    }
  } catch (error) {
    throw error
  }
}

/**
 * Get all admins
 */
export const getAllAdmins = async () => {
  try {
    const admins = await Admin.findAll({
      order: [['createdAt', 'DESC']],
    })

    return {
      success: true,
      admins: admins.map((admin) => admin.toJSON()),
    }
  } catch (error) {
    throw error
  }
}
