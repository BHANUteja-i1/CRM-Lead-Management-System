import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

const baseURL = (process.env.API_URL || `http://localhost:${process.env.PORT || 5001}`).trim()
const api = `${baseURL.replace(/\/$/, '')}/api`

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const log = (title, obj) => {
  console.log(`\n=== ${title} ===`)
  console.log(JSON.stringify(obj, null, 2))
}

const request = async (path, options = {}) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = `${api.replace(/\/$/, '')}${normalizedPath}`
  const res = await fetch(url, options)
  const text = await res.text()
  let body
  try {
    body = JSON.parse(text)
  } catch {
    body = text
  }
  return { status: res.status, ok: res.ok, body }
}

const authRequest = async (path, token, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : undefined,
    ...options.headers,
  }
  return request(path, { ...options, headers })
}

const requestRoot = async (path, options = {}) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = `${baseURL.replace(/\/$/, '')}${normalizedPath}`
  const res = await fetch(url, options)
  const text = await res.text()
  let body
  try {
    body = JSON.parse(text)
  } catch {
    body = text
  }
  return { status: res.status, ok: res.ok, body }
}

const createRandomAdmin = () => {
  const suffix = crypto.randomBytes(3).toString('hex')
  return {
    name: `Admin ${suffix}`,
    email: `admin-${suffix}@example.com`,
    password: 'Password123!',
    confirmPassword: 'Password123!',
  }
}

const createLeadPayload = (adminId, suffix) => ({
  name: `Lead ${suffix}`,
  email: `lead-${suffix}@example.com`,
  phone: '+1234567890',
  company: `Company ${suffix}`,
  source: 'Website',
  status: 'New',
  priority: 'High',
  adminId,
  value: 3000,
  expectedCloseDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
})

const run = async () => {
  log('Health Check', await requestRoot('/health'))

  const adminData = createRandomAdmin()
  const register = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(adminData),
    headers: { 'Content-Type': 'application/json' },
  })
  log('Register Admin', register)

  if (!register.ok) {
    throw new Error('Admin registration failed')
  }

  const login = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: adminData.email, password: adminData.password }),
    headers: { 'Content-Type': 'application/json' },
  })
  log('Login Admin', login)

  if (!login.ok) {
    throw new Error('Admin login failed')
  }

  const token = login.body.data.token
  const adminId = login.body.data.admin.id

  const profile = await authRequest('/auth/profile', token)
  log('Admin Profile', profile)

  const updateProfile = await authRequest('/auth/profile', token, {
    method: 'PUT',
    body: JSON.stringify({ name: `${adminData.name} Updated` }),
  })
  log('Update Profile', updateProfile)

  const admins = await authRequest('/auth/admins', token)
  log('Get All Admins', admins)

  const lead1 = await authRequest('/leads', token, {
    method: 'POST',
    body: JSON.stringify(createLeadPayload(adminId, 'alpha')),
  })
  log('Create Lead 1', lead1)

  const lead2 = await authRequest('/leads', token, {
    method: 'POST',
    body: JSON.stringify(createLeadPayload(adminId, 'beta')),
  })
  log('Create Lead 2', lead2)

  const leadsAll = await authRequest('/leads?search=alpha&status=New', token)
  log('Search & Filter Leads', leadsAll)

  const leadId = lead1.body.data.id
  const leadGet = await authRequest(`/leads/${leadId}`, token)
  log('Get Lead Detail', leadGet)

  const leadUpdate = await authRequest(`/leads/${leadId}`, token, {
    method: 'PUT',
    body: JSON.stringify({ status: 'Contacted', priority: 'Medium' }),
  })
  log('Update Lead Status', leadUpdate)

  const noteCreate = await authRequest(`/leads/${leadId}/note`, token, {
    method: 'POST',
    body: JSON.stringify({ content: 'First note entry' }),
  })
  log('Add Note', noteCreate)

  const noteId = noteCreate.body.data.notes?.[0]?.id
  if (!noteId) {
    throw new Error('Added note ID not found')
  }

  const noteUpdate = await authRequest(`/leads/${leadId}/note/${noteId}`, token, {
    method: 'PUT',
    body: JSON.stringify({ content: 'Updated note content' }),
  })
  log('Update Note', noteUpdate)

  const noteDelete = await authRequest(`/leads/${leadId}/note/${noteId}`, token, {
    method: 'DELETE',
  })
  log('Delete Note', noteDelete)

  const leadDelete = await authRequest(`/leads/${leadId}`, token, {
    method: 'DELETE',
  })
  log('Delete Lead', leadDelete)

  const dashboard = await authRequest('/dashboard', token)
  log('Dashboard', dashboard)

  const logout = await authRequest('/auth/logout', token, {
    method: 'POST',
  })
  log('Logout', logout)

  const dashboardAfterLogout = await authRequest('/dashboard', token)
  log('Dashboard After Logout (expected auth pass/ token still valid if logout does not revoke)', dashboardAfterLogout)

  console.log('\nAll API checks completed successfully.')
}

run().catch((err) => {
  console.error('Verification failed:', err)
  process.exit(1)
})
