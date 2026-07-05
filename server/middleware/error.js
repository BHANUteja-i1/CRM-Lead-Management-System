/**
 * Error handling middleware
 * Centralized error response formatting
 */
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const messages = err.errors ? err.errors.map((error) => error.message) : [err.message]
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: messages,
    })
  }

  // Duplicate key error
  if (err.code === 11000 || err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors && err.errors[0] ? err.errors[0].path : 'field'
    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
    })
  }

  // Default error response
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server error",
  });
};

/**
 * 404 Not Found middleware
 */
export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};
