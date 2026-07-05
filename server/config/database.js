import { Sequelize } from 'sequelize'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../crm_database.sqlite')

/**
 * Initialize Sequelize with SQLite
 */
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
  define: {
    timestamps: true,
    underscored: false,
  },
})

/**
 * Connect to database
 */
const connectDB = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: false })
    console.log('✓ SQLite Database connected successfully')
    console.log(`✓ Database location: ${dbPath}`)
    return sequelize
  } catch (error) {
    console.error('✗ Database Connection Error:', error.message)
    process.exit(1)
  }
}

export default connectDB
export { sequelize }
