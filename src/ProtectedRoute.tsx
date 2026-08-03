import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = localStorage.getItem('user')
  const isAuthenticated = user ? JSON.parse(user) : null

  if (!isAuthenticated?.isLogin) {
    return <Navigate to="/mentor/login" replace />
  }

  return children
}
