import http from 'http'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

import connectDB from './config/database.js'
import Admin from './models/Admin.js'
import Lead from './models/Lead.js'
import authRoutes from './routes/authRoutes.js'
import leadRoutes from './routes/leadRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import { errorHandler, notFound } from './middleware/error.js'

dotenv.config()

const app = express()

/**
 * Database Connection & Initialization
 */
let db
;(async () => {
  try {
    db = await connectDB()
  } catch (error) {
    console.error('Failed to initialize database:', error)
    process.exit(1)
  }
})()

/**
 * Security Middleware
 */
app.use(helmet())

/**
 * CORS Configuration
 */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
)

/**
 * Rate Limiting
 */
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests, please try again later',
})

app.use('/api/', limiter)

/**
 * Body Parser Middleware
 */
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

/**
 * Health Check
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date(),
  })
})

/**
 * API Routes
 */
app.use('/api/auth', authRoutes)
app.use('/api/leads', leadRoutes)
app.use('/api/dashboard', dashboardRoutes)

/**
 * Error Handling
 */
app.use(notFound)
app.use(errorHandler)

/**
 * Start Server
 */
const PORT = parseInt(process.env.PORT, 10) || 5001

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`)
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`)
})

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    const fallbackPort = PORT + 1
    console.warn(`Port ${PORT} in use, switching to ${fallbackPort}`)
    server.listen(fallbackPort)
  } else {
    console.error('Server error:', error)
    process.exit(1)
  }
})

export default app
