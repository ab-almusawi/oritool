# Quick Start Guide

Get Oritool up and running in 5 minutes!

## 1. Install Dependencies

From the project root:
```bash
npm run install:all
```

Or manually:
```bash
cd frontend
npm install
cd ../backend
npm install
```

## 2. Set Up Database

### Option A: Using Docker (Recommended)
```bash
docker run --name oritool-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=oritool -p 5432:5432 -d postgres:14
```

### Option B: Local PostgreSQL
1. Install PostgreSQL
2. Create database:
```sql
CREATE DATABASE oritool;
```

## 3. Configure Backend

Create `backend/.env` file:
```env
PORT=3000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=4f3a8c2e9d1b7e6f5a4d3c2b1a9e8d7c6b5a4f3e2d1c0b9a8e7d6c5b4a3f2e1d0c9b8a7e6d5c4b3a2f1e0d9c8b7a6e5d4c3b2a1f0e9d8c7b

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=oritool
```

## 4. Seed Database

Create admin user:
```bash
cd backend
npm run seed
```

This creates:
- **Email**: admin@oritool.com
- **Password**: admin123

## 5. Start Development Servers

### Terminal 1 - Backend
```bash
npm run dev:backend
```
Backend runs on: http://localhost:3000

### Terminal 2 - Frontend
```bash
npm run dev:frontend
```
Frontend runs on: http://localhost:5173

## 6. Visit the Application

Open your browser and navigate to:
- **Website**: http://localhost:5173
- **Login**: http://localhost:5173/login
- **Dashboard**: http://localhost:5173/dashboard (requires login)
- **Products**: http://localhost:5173/products
- **Services**: http://localhost:5173/services
- **About**: http://localhost:5173/about
- **Contact**: http://localhost:5173/contact
- **API**: http://localhost:3000/products

## What You Get

### 🎨 Modern Dark Mode Design
- Beautiful gradient hero section
- Smooth animations and transitions
- Responsive mobile-first layout
- Toggle between light/dark themes

### 🔐 Complete Authentication System
- JWT-based authentication
- Admin login and protected routes
- Secure password hashing with bcrypt
- Role-based access control

### 📦 Full Product Management Dashboard
- Add products with images and URLs
- Edit existing products
- Delete products with confirmation
- Real-time CRUD operations
- Product features management
- Category selection

### 🌐 Complete Website Pages
- **Home**: Hero section with services overview
- **Products**: Showcase all active products with images
- **Services**: Detailed service descriptions
- **About**: Company information and values
- **Contact**: Contact form and information

### 🚀 Technology Stack
- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Backend**: NestJS + TypeORM + PostgreSQL + JWT
- **Design**: shadcn/ui components
- **Icons**: Lucide React
- **Auth**: Passport JWT

## Troubleshooting

### Database Connection Error
Make sure PostgreSQL is running:
```bash
docker ps  # Check if container is running
```

### Port Already in Use
Change ports in:
- Backend: `backend/.env` → `PORT=3001`
- Frontend: `frontend/vite.config.ts` → add `server: { port: 5174 }`

### TypeScript Errors
Clear cache and reinstall:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Explore the dashboard and add products
2. Customize the theme colors in `frontend/src/index.css`
3. Add more pages (About, Contact, Services)
4. Implement authentication
5. Add product images

For detailed documentation, see [README.md](./README.md)
