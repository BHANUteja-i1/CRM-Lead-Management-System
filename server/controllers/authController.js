import * as authService from "../services/authService.js";
import { successResponse, errorResponse } from "../utils/helpers.js";
import { validateEmail, validatePassword } from "../utils/validation.js";

/**
 * @route   POST /api/auth/register
 * @desc    Register a new admin
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password) {
      return errorResponse(res, 400, "Please provide all required fields");
    }

    if (!validateEmail(email)) {
      return errorResponse(res, 400, "Please provide a valid email");
    }

    if (!validatePassword(password)) {
      return errorResponse(res, 400, "Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return errorResponse(res, 400, "Passwords do not match");
    }

    const result = await authService.registerAdmin({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      return errorResponse(res, 400, "Email already registered");
    }
    next(error);
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Login admin
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return errorResponse(res, 400, "Please provide email and password");
    }

    if (!validateEmail(email)) {
      return errorResponse(res, 400, "Please provide a valid email");
    }

    const result = await authService.loginAdmin(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    if (error.statusCode === 401) {
      return errorResponse(res, 401, error.message);
    }
    if (error.statusCode === 403) {
      return errorResponse(res, 403, error.message);
    }
    next(error);
  }
};

/**
 * @route   GET /api/auth/profile
 * @desc    Get admin profile
 * @access  Private
 */
export const getProfile = async (req, res, next) => {
  try {
    const result = await authService.getAdminProfile(req.admin.id);
    successResponse(res, 200, "Profile retrieved successfully", result.admin);
  } catch (error) {
    if (error.statusCode === 404) {
      return errorResponse(res, 404, error.message);
    }
    next(error);
  }
};

/**
 * @route   PUT /api/auth/profile
 * @desc    Update admin profile
 * @access  Private
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const result = await authService.updateAdminProfile(req.admin.id, {
      name,
      email,
    });

    successResponse(res, 200, "Profile updated successfully", result.admin);
  } catch (error) {
    if (error.statusCode === 404) {
      return errorResponse(res, 404, error.message);
    }
    if (error.code === 11000) {
      return errorResponse(res, 400, "Email already in use");
    }
    next(error);
  }
};

/**
 * @route   GET /api/auth/admins
 * @desc    Get all admins
 * @access  Private
 */
export const getAllAdmins = async (req, res, next) => {
  try {
    const result = await authService.getAllAdmins();
    successResponse(res, 200, "Admins retrieved successfully", result.admins);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/auth/logout
 * @desc    Logout admin (client-side token removal)
 * @access  Private
 */
export const logout = (req, res) => {
  successResponse(res, 200, "Logged out successfully");
};
