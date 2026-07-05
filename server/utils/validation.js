import validator from "validator";

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  return validator.isEmail(email);
};

/**
 * Validate password strength
 * At least 6 characters
 */
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  return phoneRegex.test(phone);
};

/**
 * Sanitize input to prevent XSS
 */
export const sanitizeInput = (input) => {
  return validator.escape(input);
};

/**
 * Validate lead data
 */
export const validateLeadData = (data) => {
  const errors = [];

  if (!data.name || validator.isEmpty(data.name.trim())) {
    errors.push("Name is required");
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.push("Valid email is required");
  }

  if (!data.phone || !validatePhone(data.phone)) {
    errors.push("Valid phone number is required");
  }

  if (!data.company || validator.isEmpty(data.company.trim())) {
    errors.push("Company is required");
  }

  if (!data.adminId && !data.assignedTo) {
    errors.push("Must assign to an admin");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
