import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'
import Admin from './Admin.js'

/**
 * Lead Model - SQL/Sequelize
 * Stores client/prospect lead information
 */
const Lead = sequelize.define(
  'Lead',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide lead name' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: 'Please provide a valid email' },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
          msg: 'Please provide a valid phone number',
        },
      },
    },
    company: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    source: {
      type: DataTypes.ENUM('Website', 'Email', 'Phone', 'Social Media', 'Referral', 'Advertisement'),
      defaultValue: 'Website',
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('New', 'Contacted', 'Qualified', 'Converted', 'Closed'),
      defaultValue: 'New',
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      defaultValue: 'Medium',
      allowNull: false,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admin,
        key: 'id',
      },
    },
    notes: {
      type: DataTypes.JSON,
      defaultValue: [],
      comment: 'Array of notes: [{id, content, authorId, createdAt}, ...]',
    },
    lastContactDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    expectedCloseDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    indexes: [
      { fields: ['email'] },
      { fields: ['status'] },
      { fields: ['adminId'] },
      { fields: ['createdAt'] },
    ],
  }
)

/**
 * Define relationships
 */
Lead.belongsTo(Admin, { 
  foreignKey: 'adminId', 
  as: 'assignedTo' 
})

/**
 * Calculate lead age in days
 */
Lead.prototype.getLeadAge = function () {
  const now = new Date()
  const created = new Date(this.createdAt)
  return Math.floor((now - created) / (1000 * 60 * 60 * 24))
}

export default Lead
