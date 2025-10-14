# Oritool - Technology Solutions Company Website

A modern, full-stack company website for Oritool, specializing in software programming, cybersecurity, and technology solutions.

## Tech Stack

### Frontend
- **Vite + React 18** - Modern, fast development
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Lucide React** - Modern icon library
- **Dark Mode** - Built-in theme switching

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeORM** - ORM for database management
- **PostgreSQL** - Production database
- **Class Validator** - DTO validation
- **TypeScript** - Type safety

## Project Structure

```
oritool/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # Reusable UI components
│   │   │   └── custom/      # Custom components
│   │   ├── pages/           # Page components
│   │   ├── lib/             # Utilities
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   └── types/           # TypeScript types
│   └── package.json
│
└── backend/                  # NestJS backend API
    ├── src/
    │   ├── products/        # Products module
    │   │   ├── dto/         # Data transfer objects
    │   │   ├── product.entity.ts
    │   │   ├── products.service.ts
    │   │   ├── products.controller.ts
    │   │   └── products.module.ts
    │   ├── app.module.ts
    │   └── main.ts
    └── package.json
```

## Features

### Public Website
- **Modern Landing Page** - Showcase your technology services
- **Products Catalog** - Display all software products
- **Responsive Design** - Mobile-first approach
- **Dark Mode** - Toggle between light and dark themes
- **Fast Performance** - Optimized for speed

### Dashboard
- **Product Management** - Add, edit, delete products
- **CRUD Operations** - Full product lifecycle management
- **Real-time Updates** - Instant UI updates
- **Form Validation** - Client and server-side validation

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+ (or use Docker)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=3000
FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=oritool
```

4. Start PostgreSQL database:
```bash
# Using Docker (recommended for development)
docker run --name oritool-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=oritool -p 5432:5432 -d postgres:14

# Or install PostgreSQL locally and create database
psql -U postgres
CREATE DATABASE oritool;
```

5. Start the backend server:
```bash
npm run start:dev
```

Backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Endpoints

### Products API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get product by ID |
| POST | `/products` | Create new product |
| PATCH | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

### Example Product Object

```json
{
  "name": "SecureGuard Pro",
  "description": "Enterprise-grade cybersecurity platform",
  "category": "Cybersecurity",
  "price": "$999/month",
  "status": "active",
  "features": [
    "24/7 Threat Monitoring",
    "Advanced Firewall",
    "Vulnerability Scanning"
  ]
}
```

## Development Guidelines

### Frontend Development
- Use Tailwind CSS for all styling (no inline styles)
- Components should be 50-200 lines
- Follow Feature-Sliced Design architecture
- Ensure mobile-first responsive design
- Maintain accessibility standards

### Backend Development
- Follow NestJS best practices
- Use DTOs for validation
- Context-specific organization
- Services: 25-350 lines based on complexity
- Always use built-in NestJS features

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

### Backend Build
```bash
cd backend
npm run build
npm run start:prod
```

## Environment Variables

### Backend (.env)
```env
PORT=3000
FRONTEND_URL=https://your-frontend-domain.com

DB_HOST=your-db-host
DB_PORT=5432
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=oritool
```

### Frontend
Update API base URL in production:
```typescript
// src/services/api.ts
const API_URL = import.meta.env.PROD 
  ? 'https://your-api-domain.com' 
  : 'http://localhost:3000'
```

## Features Roadmap

- [x] User authentication and authorization (JWT-based)
- [x] Product image upload with optimization
- [x] Contact form with database storage
- [x] Multi-language support (5 languages)
- [x] Admin dashboard with inbox
- [ ] Advanced search and filtering
- [ ] Product categories management
- [ ] Email integration for contact form
- [ ] Blog/News section
- [ ] Client testimonials
- [ ] Team members page
- [ ] Analytics dashboard

## Production Deployment

### Documentation

- 📘 **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete step-by-step deployment guide
- 🚀 **[GITHUB_AND_UPDATE.md](./GITHUB_AND_UPDATE.md)** - GitHub setup & updating live server
- ✅ **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Deployment checklist

### Quick Deployment

For detailed step-by-step deployment instructions, see the documentation above.

### Quick Start

1. **Upload code to server:**
```bash
# From your local machine
rsync -avz --progress /path/to/oritool/ user@your-server:/var/www/oritool/
```

2. **Run deployment script:**
```bash
# On server
cd /var/www/oritool
chmod +x deploy.sh
./deploy.sh deploy
```

3. **Make script executable:**
```bash
chmod +x deploy.sh
```

### Deployment Commands

```bash
# Deploy/update application
./deploy.sh deploy

# Create backup
./deploy.sh backup

# View logs
./deploy.sh logs

# Check status
./deploy.sh status

# Restart services
./deploy.sh restart
```

### Requirements
- Ubuntu 20.04/22.04
- Node.js 20+
- PostgreSQL 14+
- Nginx
- Domain with SSL (Let's Encrypt)

## Technology Stack Summary

### Frontend
- ⚡ Vite + React 18 + TypeScript
- 🎨 Tailwind CSS + shadcn/ui
- 🌐 React Router + i18next
- 🎭 Dark mode + Glass morphism
- 🖼️ Image optimization (WebP)
- 🌍 5 Languages (EN, AR, RU, UK, FR)

### Backend
- 🚀 NestJS + TypeScript
- 💾 PostgreSQL + TypeORM
- 🔐 JWT Authentication + Bcrypt
- 📁 Multer + Sharp (Image processing)
- ✅ Class Validator
- 📧 Contact message system

### DevOps
- 🐳 Docker support (PostgreSQL)
- 🔄 PM2 Process Manager
- 🌐 Nginx Reverse Proxy
- 🔒 Let's Encrypt SSL
- 📦 Automated deployment script
- 💾 Backup automation

## License

MIT

## Support

For support, email support@oritool.com or info@oritool.com

**Contact Information:**
- 📧 Email: support@oritool.com / info@oritool.com
- 📞 Phone: +380 93 311 1222
- 📍 Address: Mikola Amasova Street, Building 32A, Vinnitsia, Ukraine

---

**🚀 Ready for Production!** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete deployment instructions.
