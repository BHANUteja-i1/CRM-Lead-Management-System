import { DataTypes } from 'sequelize'
import bcryptjs from 'bcryptjs'
import { sequelize } from '../config/database.js'

/**
 * Admin Model - SQL/Sequelize
 * Stores admin user credentials and information
 */
const Admin = sequelize.define(
  'Admin',
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
        notEmpty: { msg: 'Please provide an admin name' },
        len: [1, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      lowercase: true,
      validate: {
        isEmail: { msg: 'Please provide a valid email' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255],
      },
    },
    role: {
      type: DataTypes.ENUM('admin', 'superadmin'),
      defaultValue: 'admin',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastLogin: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        fields: ['email'],
        unique: true,
      },
    ],
  }
)

/**
 * Hash password before saving
 */
Admin.beforeCreate(async (admin) => {
  try {
    const salt = await bcryptjs.genSalt(10)
    admin.password = await bcryptjs.hash(admin.password, salt)
  } catch (error) {
    throw new Error('Error hashing password')
  }
})

Admin.beforeUpdate(async (admin) => {
  if (admin.changed('password')) {
    try {
      const salt = await bcryptjs.genSalt(10)
      admin.password = await bcryptjs.hash(admin.password, salt)
    } catch (error) {
      throw new Error('Error hashing password')
    }
  }
})

/**
 * Compare password method
 */
Admin.prototype.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password)
}

/**
 * Custom JSON output (exclude password)
 */
Admin.prototype.toJSON = function () {
  const values = { ...this.dataValues }
  delete values.password
  return values
}

export default Admin
