import Lead from './models/Lead.js'
import './config/database.js'

const lead = await Lead.findByPk(1)
console.log('Lead notes value:', lead?.notes)
console.log('Lead notes type:', typeof lead?.notes)
console.log('Lead raw:', lead?.get({ plain: true }))
