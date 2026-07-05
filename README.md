# CRM Lead Management System - Complete MERN Stack Application

A production-ready, fully responsive Client Lead Management System (Mini CRM) built with the MERN stack. This application provides comprehensive lead management, analytics, and business intelligence features in a modern, professional interface.

## 🌟 Features

### Authentication
- ✅ Admin Registration & Login
- ✅ JWT-based Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Protected Routes
- ✅ Token Expiration & Refresh
- ✅ Session Management

### Lead Management
- ✅ Complete CRUD Operations
- ✅ Lead Status Workflow (New → Contacted → Qualified → Converted → Closed)
- ✅ Priority Levels (High, Medium, Low)
- ✅ Lead Sources Tracking
- ✅ Lead Assignment
- ✅ Bulk Operations Ready

### Advanced Features
- ✅ Notes & Follow-ups Management
- ✅ Search by Name, Email, Company
- ✅ Multi-filter Capabilities (Status, Source, Priority, Date Range)
- ✅ Sorting Options (Newest, Oldest, Alphabetical)
- ✅ Pagination Support
- ✅ Real-time Analytics & Dashboard

### Dashboard & Analytics
- ✅ Summary Cards (Total Leads, Conversion Rate, etc.)
- ✅ Charts & Visualizations
  - Leads by Status (Pie Chart)
  - Leads by Priority (Bar Chart)
  - Monthly Lead Trends (Line Chart)
  - Leads by Source (Progress Bars)
- ✅ Conversion Rate Calculation
- ✅ Real-time Data Updates

### UI/UX
- ✅ Modern, Clean Design
- ✅ Dark Mode / Light Mode Toggle
- ✅ Fully Responsive (Mobile, Tablet, Desktop)
- ✅ Loading Skeletons
- ✅ Toast Notifications
- ✅ Confirmation Dialogs
- ✅ Empty States
- ✅ Smooth Animations (Framer Motion)
- ✅ Accessibility Optimized

### Security
- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Input Validation
- ✅ XSS Protection
- ✅ CORS Configuration
- ✅ Helmet Security Headers
- ✅ Rate Limiting
- ✅ Environment Variables

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - UI Framework
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Utility-first CSS Framework
- **React Router DOM** - Client-side Routing
- **Axios** - HTTP Client
- **React Hook Form** - Form Management
- **Framer Motion** - Animations
- **Recharts** - Charts & Visualizations
- **React Icons** - Icon Library
- **React Hot Toast** - Notifications
- **Zustand** - State Management

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **SQLite** - Embedded SQL Database
- **Sequelize** - ORM for SQLite
- **JWT** - Authentication
- **bcryptjs** - Password Hashing
- **Validator** - Input Validation
- **Helmet** - Security Headers
- **Express Rate Limit** - API Rate Limiting
- **CORS** - Cross-Origin Resource Sharing

### Database
- **SQLite** - Embedded local database file (`server/crm_database.sqlite`)

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: SQLite embedded file

## 📁 Project Structure

```
crm-system/
│
├── client/                      # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Images, fonts, etc.
│   │   ├── components/
│   │   │   ├── ui/            # Reusable UI components
│   │   │   │   ├── FormElements.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Table.jsx
│   │   │   └── common/        # Common components
│   │   │       └── CardComponents.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── AuthPages.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LeadsPage.jsx
│   │   │   └── SettingsPage.jsx
│   │   ├── layouts/           # Layout components
│   │   │   └── MainLayout.jsx
│   │   ├── hooks/             # Custom React hooks
│   │   ├── context/           # Context API
│   │   ├── services/          # API services
│   │   │   └── api.js
│   │   ├── stores/            # Zustand stores
│   │   │   └── index.js
│   │   ├── utils/             # Utility functions
│   │   ├── routes/            # Route protection
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── server/                      # Express Backend
│   ├── config/
│   │   └── database.js         # SQLite / Sequelize configuration
│   ├── controllers/
│   │   ├── authController.js
│   │   └── leadController.js
│   ├── middleware/
│   │   ├── auth.js             # JWT auth middleware
│   │   └── error.js            # Error handling
│   ├── models/
│   │   ├── Admin.js
│   │   └── Lead.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── leadRoutes.js
│   │   └── dashboardRoutes.js
│   ├── services/
│   │   ├── authService.js
│   │   └── leadService.js
│   ├── utils/
│   │   ├── validation.js
│   │   └── helpers.js
│   ├── server.js               # Main server file
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Git

### Backend Setup

1. **Clone the repository**
```bash
cd server
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
Edit `.env` file if needed and ensure the following values exist:
```
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

5. **Start the development server**
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**
```bash
cd client
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
Edit `.env` file:
```
VITE_API_URL=http://localhost:5000
```

5. **Start the development server**
```bash
npm run dev
```

Application will run on `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

#### Register Admin
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Admin",
  "email": "admin@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

Response: 201
{
  "success": true,
  "message": "Admin registered successfully",
  "data": {
    "admin": {...},
    "token": "jwt_token_here"
  }
}
```

#### Login Admin
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}

Response: 200
{
  "success": true,
  "message": "Login successful",
  "data": {
    "admin": {...},
    "token": "jwt_token_here"
  }
}
```

#### Get Admin Profile
```http
GET /api/auth/profile
Authorization: Bearer jwt_token_here

Response: 200
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {...}
}
```

### Lead Endpoints

#### Get All Leads
```http
GET /api/leads?page=1&limit=10&search=&status=&priority=&sortBy=-createdAt
Authorization: Bearer jwt_token_here

Response: 200
{
  "success": true,
  "message": "Leads retrieved successfully",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### Get Single Lead
```http
GET /api/leads/:leadId
Authorization: Bearer jwt_token_here

Response: 200
{
  "success": true,
  "message": "Lead retrieved successfully",
  "data": {...}
}
```

#### Create Lead
```http
POST /api/leads
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "name": "Jane Prospect",
  "email": "jane@company.com",
  "phone": "+1 (555) 123-4567",
  "company": "Tech Corp",
  "source": "Website",
  "status": "New",
  "priority": "High",
  "assignedTo": "admin_id_here"
}

Response: 201
{
  "success": true,
  "message": "Lead created successfully",
  "data": {...}
}
```

#### Update Lead
```http
PUT /api/leads/:leadId
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "status": "Contacted",
  "priority": "Medium"
}

Response: 200
{
  "success": true,
  "message": "Lead updated successfully",
  "data": {...}
}
```

#### Delete Lead
```http
DELETE /api/leads/:leadId
Authorization: Bearer jwt_token_here

Response: 200
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

#### Add Note to Lead
```http
POST /api/leads/:leadId/note
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "content": "Follow up required - Very interested in demo"
}

Response: 201
{
  "success": true,
  "message": "Note added successfully",
  "data": {...}
}
```

#### Update Note
```http
PUT /api/leads/:leadId/note/:noteId
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "content": "Updated note content"
}

Response: 200
{
  "success": true,
  "message": "Note updated successfully",
  "data": {...}
}
```

#### Delete Note
```http
DELETE /api/leads/:leadId/note/:noteId
Authorization: Bearer jwt_token_here

Response: 200
{
  "success": true,
  "message": "Note deleted successfully",
  "data": {...}
}
```

### Dashboard Endpoints

#### Get Analytics
```http
GET /api/dashboard
Authorization: Bearer jwt_token_here

Response: 200
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
    "leadsByStatus": {...},
    "leadsByPriority": {...},
    "leadsBySource": {...},
    "monthlyLeads": [...]
  }
}
```

## 🔐 Security Features

### Authentication
- JWT tokens with 7-day expiration
- Bcrypt password hashing (10 salt rounds)
- Secure token storage in localStorage
- Token refresh mechanism

### Input Validation
- Email format validation
- Phone number validation
- Length constraints
- Type checking

### API Security
- CORS enabled with specific origins
- Helmet for security headers
- Rate limiting (100 requests per 15 minutes)
- Request size limits

### Database Security
- Connection string encryption
- Indexed fields for performance
- Password field excluded from responses

## 📊 Database Schema

### Admin Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (admin/superadmin),
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Lead Model
```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  company: String (required),
  source: String (enum),
  status: String (enum),
  priority: String (enum),
  assignedTo: ObjectId (ref: Admin),
  notes: [{
    content: String,
    author: ObjectId (ref: Admin),
    createdAt: Date
  }],
  lastContactDate: Date,
  value: Number,
  expectedCloseDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI/UX Features

### Design System
- **Colors**: Blue primary, Slate neutral, with accent colors
- **Typography**: Clean, hierarchical
- **Spacing**: 4px base unit
- **Shadows**: Subtle, elevation-based
- **Animations**: Smooth transitions (Framer Motion)

### Components
- Reusable UI components (Button, Input, Select, etc.)
- Modal dialogs with animations
- Data tables with pagination
- Charts and visualizations
- Loading skeletons
- Toast notifications
- Empty states
- Error boundaries

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Responsive sidebar navigation
- Touch-friendly interactions

## 🚀 Deployment Guide

### Frontend Deployment (Vercel)

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
- Go to vercel.com
- Click "New Project"
- Import your GitHub repository
- Configure build settings:
  - Build Command: `npm run build`
  - Output Directory: `dist`

3. **Set Environment Variables**
- Add `VITE_API_URL` with your backend URL

4. **Deploy**
- Vercel automatically deploys on every push

### Backend Deployment (Render)

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Render**
- Go to render.com
- Create new Web Service
- Connect your GitHub repository
- Configure build settings:
  - Build Command: `npm install`
  - Start Command: `node server.js`

3. **Set Environment Variables**
- JWT_SECRET
- JWT_EXPIRE
- CORS_ORIGIN (Vercel frontend URL)

4. **Deploy**
- Render automatically deploys on every push

## 📈 Performance Optimization

### Frontend
- Code splitting with React Router
- Lazy loading of components
- Image optimization
- CSS minification
- JavaScript minification
- Caching strategies

### Backend
- Database indexing
- Response caching
- Pagination for large datasets
- Query optimization
- Connection pooling

### Target Lighthouse Scores
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## 🧪 Testing

### Backend Testing (To be implemented)
```bash
npm test
```

### Frontend Testing (To be implemented)
```bash
npm test
```

## 📝 Environment Variables

### Backend (.env)
```
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=production
CORS_ORIGIN=your_frontend_url
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)
```
VITE_API_URL=your_backend_url
```

## 🐛 Common Issues & Solutions

### CORS Error
- Ensure CORS_ORIGIN in backend matches frontend URL
- Check if API URL is correct in frontend .env

### Authentication Fails
- Verify JWT_SECRET is consistent
- Check token expiration time
- Ensure localStorage is accessible

### Database Connection Error
- Ensure the `server/crm_database.sqlite` file exists
- Check that the backend is running and `server/database.js` is configured correctly
- Verify environment variables are correct

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Built as a production-ready SQLite-based CRM project showcasing modern web development best practices.

## 🙏 Acknowledgments

- Built with inspiration from SaaS applications like Salesforce, HubSpot, and Notion
- Uses industry-standard libraries and best practices
- Production-ready code with comprehensive documentation

## 📞 Support

For support, email support@crmapp.com or open an issue in the repository.

---

**Last Updated**: 2024
**Version**: 1.0.0
