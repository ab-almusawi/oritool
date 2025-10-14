import { Navigate } from 'react-router-dom'
import { api } from '@/services/api'

interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  if (!api.isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && !api.isAdmin()) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
