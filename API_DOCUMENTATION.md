# API Documentation - CRM Lead Management System

## Base URL
```
http://localhost:5000/api
or
https://your-backend-url/api
```

## Authentication
All protected endpoints require JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 1. Authentication Endpoints

### Register Admin
**Endpoint:** `POST /auth/register`
**Access:** Public
**Description:** Create a new admin account

**Request Body:**
```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "data": {
    "admin": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Admin Name",
      "email": "admin@example.com",
      "role": "admin",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

### Login Admin
**Endpoint:** `POST /auth/login`
**Access:** Public
**Description:** Authenticate admin and get JWT token

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "admin": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Admin Name",
      "email": "admin@example.com",
      "role": "admin",
      "lastLogin": "2024-01-01T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Get Admin Profile
**Endpoint:** `GET /auth/profile`
**Access:** Protected
**Description:** Retrieve current admin's profile

**Response (200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Admin Name",
    "email": "admin@example.com",
    "role": "admin",
    "isActive": true,
    "lastLogin": "2024-01-01T12:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Update Admin Profile
**Endpoint:** `PUT /auth/profile`
**Access:** Protected
**Description:** Update admin profile information

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Updated Name",
    "email": "newemail@example.com"
  }
}
```

---

### Logout
**Endpoint:** `POST /auth/logout`
**Access:** Protected
**Description:** Logout admin (client removes token)

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Get All Admins
**Endpoint:** `GET /auth/admins`
**Access:** Protected
**Description:** Retrieve list of all admins

**Response (200):**
```json
{
  "success": true,
  "message": "Admins retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Admin Name",
      "email": "admin@example.com",
      "role": "admin",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## 2. Lead Endpoints

### Get All Leads
**Endpoint:** `GET /leads`
**Access:** Protected
**Description:** Retrieve all leads with filters and pagination

**Query Parameters:**
```
- page: number (default: 1)
- limit: number (default: 10, max: 100)
- search: string (search by name, email, company)
- status: string (New, Contacted, Qualified, Converted, Closed)
- source: string (Website, Email, Phone, Social Media, Referral, Advertisement)
- priority: string (Low, Medium, High)
- startDate: string (ISO date format)
- endDate: string (ISO date format)
- sortBy: string (default: -createdAt, options: name, createdAt)
```

**Example Request:**
```
GET /leads?page=1&limit=10&status=New&priority=High&sortBy=-createdAt
```

**Response (200):**
```json
{
  "success": true,
  "message": "Leads retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@company.com",
      "phone": "+1 (555) 123-4567",
      "company": "Tech Corp",
      "source": "Website",
      "status": "New",
      "priority": "High",
      "assignedTo": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Admin Name",
        "email": "admin@example.com"
      },
      "notes": [],
      "lastContactDate": null,
      "value": 0,
      "expectedCloseDate": null,
      "createdAt": "2024-01-01T10:00:00.000Z",
      "updatedAt": "2024-01-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

### Get Single Lead
**Endpoint:** `GET /leads/:id`
**Access:** Protected
**Description:** Retrieve a specific lead by ID

**Path Parameters:**
```
- id: string (Lead ID)
```

**Response (200):**
```json
{
  "success": true,
  "message": "Lead retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john@company.com",
    "phone": "+1 (555) 123-4567",
    "company": "Tech Corp",
    "source": "Website",
    "status": "New",
    "priority": "High",
    "assignedTo": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Admin Name"
    },
    "notes": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "content": "Very interested in demo",
        "author": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Admin Name"
        },
        "createdAt": "2024-01-01T11:00:00.000Z"
      }
    ],
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T11:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Lead not found"
}
```

---

### Create Lead
**Endpoint:** `POST /leads`
**Access:** Protected
**Description:** Create a new lead

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "phone": "+1 (555) 123-4567",
  "company": "Tech Corp",
  "source": "Website",
  "status": "New",
  "priority": "High",
  "assignedTo": "507f1f77bcf86cd799439011"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john@company.com",
    "phone": "+1 (555) 123-4567",
    "company": "Tech Corp",
    "source": "Website",
    "status": "New",
    "priority": "High",
    "assignedTo": "507f1f77bcf86cd799439011",
    "notes": [],
    "createdAt": "2024-01-01T10:00:00.000Z"
  }
}
```

---

### Update Lead
**Endpoint:** `PUT /leads/:id`
**Access:** Protected
**Description:** Update lead information

**Path Parameters:**
```
- id: string (Lead ID)
```

**Request Body (Partial):**
```json
{
  "status": "Contacted",
  "priority": "Medium",
  "lastContactDate": "2024-01-02T10:00:00.000Z"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Lead updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "status": "Contacted",
    "priority": "Medium",
    "lastContactDate": "2024-01-02T10:00:00.000Z",
    "updatedAt": "2024-01-02T10:00:00.000Z"
  }
}
```

---

### Delete Lead
**Endpoint:** `DELETE /leads/:id`
**Access:** Protected
**Description:** Delete a lead

**Path Parameters:**
```
- id: string (Lead ID)
```

**Response (200):**
```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

---

## 3. Notes Endpoints

### Add Note to Lead
**Endpoint:** `POST /leads/:id/note`
**Access:** Protected
**Description:** Add a note to a specific lead

**Path Parameters:**
```
- id: string (Lead ID)
```

**Request Body:**
```json
{
  "content": "Follow up required - Very interested in demo"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Note added successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "notes": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "content": "Follow up required - Very interested in demo",
        "author": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Admin Name"
        },
        "createdAt": "2024-01-02T10:00:00.000Z"
      }
    ]
  }
}
```

---

### Update Note
**Endpoint:** `PUT /leads/:leadId/note/:noteId`
**Access:** Protected
**Description:** Update a note in a lead

**Path Parameters:**
```
- leadId: string (Lead ID)
- noteId: string (Note ID)
```

**Request Body:**
```json
{
  "content": "Updated note content"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Note updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "notes": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "content": "Updated note content",
        "author": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Admin Name"
        },
        "createdAt": "2024-01-02T10:00:00.000Z"
      }
    ]
  }
}
```

---

### Delete Note
**Endpoint:** `DELETE /leads/:leadId/note/:noteId`
**Access:** Protected
**Description:** Delete a note from a lead

**Path Parameters:**
```
- leadId: string (Lead ID)
- noteId: string (Note ID)
```

**Response (200):**
```json
{
  "success": true,
  "message": "Note deleted successfully",
  "data": {...}
}
```

---

## 4. Dashboard Endpoints

### Get Dashboard Analytics
**Endpoint:** `GET /dashboard`
**Access:** Protected
**Description:** Retrieve dashboard analytics and statistics

**Response (200):**
```json
{
  "success": true,
  "message": "Dashboard data retrieved successfully",
  "data": {
    "summary": {
      "totalLeads": 150,
      "newLeads": 25,
      "contactedLeads": 30,
      "qualifiedLeads": 45,
      "convertedLeads": 40,
      "closedLeads": 10,
      "conversionRate": "26.67%"
    },
    "leadsByStatus": {
      "New": 25,
      "Contacted": 30,
      "Qualified": 45,
      "Converted": 40,
      "Closed": 10
    },
    "leadsByPriority": {
      "Low": 50,
      "Medium": 60,
      "High": 40
    },
    "leadsBySource": {
      "Website": 60,
      "Email": 30,
      "Phone": 20,
      "Social Media": 25,
      "Referral": 10,
      "Advertisement": 5
    },
    "monthlyLeads": [
      {
        "_id": {
          "month": 12,
          "year": 2023
        },
        "count": 45
      },
      {
        "_id": {
          "month": 1,
          "year": 2024
        },
        "count": 60
      }
    ]
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Field1 is required", "Field2 format is invalid"]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No authorization token provided"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Admin account is inactive"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server error"
}
```

---

## Status Codes

| Code | Description |
|------|-------------|
| 200  | OK - Request successful |
| 201  | Created - Resource created successfully |
| 400  | Bad Request - Invalid input |
| 401  | Unauthorized - Authentication required |
| 403  | Forbidden - Access denied |
| 404  | Not Found - Resource not found |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Server Error - Internal server error |

---

## Rate Limiting

API requests are rate limited to **100 requests per 15 minutes** per IP address.

When rate limit is exceeded, you'll receive:
```
HTTP/1.1 429 Too Many Requests
```

---

## CORS Headers

The API includes CORS support for cross-origin requests:
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Pagination

For endpoints that return lists, pagination is supported:

```
GET /leads?page=2&limit=20
```

**Pagination Response:**
```json
{
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": true
  }
}
```

---

## Sorting

Sort parameters use the format: `field` (ascending) or `-field` (descending)

```
GET /leads?sortBy=-createdAt    // Newest first
GET /leads?sortBy=name          // Alphabetical
GET /leads?sortBy=-priority     // High to Low priority
```

---

## Date Filtering

Date parameters should be in ISO 8601 format:

```
GET /leads?startDate=2024-01-01&endDate=2024-01-31
GET /leads?startDate=2024-01-01T00:00:00Z
```

---

## Examples

### cURL Examples

**Register Admin:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

**Get Leads:**
```bash
curl -X GET "http://localhost:5000/api/leads?page=1&limit=10" \
  -H "Authorization: Bearer your_token_here"
```

**Create Lead:**
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_token_here" \
  -d '{
    "name": "John Doe",
    "email": "john@company.com",
    "phone": "+1 (555) 123-4567",
    "company": "Tech Corp",
    "source": "Website",
    "status": "New",
    "priority": "High",
    "assignedTo": "admin_id_here"
  }'
```

---

## Webhooks (Future Feature)

Webhooks for real-time events are planned for future releases.

---

## Version

**API Version:** 1.0.0
**Last Updated:** 2024
