import { Navigate, useNavigate } from 'react-router-dom'

import { useEffect } from 'react'

import { AuthStatus, useAuthStore } from '@/store/authStore'

export const PrivateRoutes = ({ children }: any) => {
  const { authStatus } = useAuthStore()
  const { refreshToken } = useAuthStore()

  useEffect(() => {
    refreshToken()
    /* if (authStatus === AuthStatus.AUTHENTICATED) {
      navigate('/dashboard')
    } */
  }, [authStatus])

  if (authStatus === AuthStatus.CHECKING) return <div>Loading...</div>

  if (authStatus === AuthStatus.UNAUTHENTICATED)
    return <Navigate to="/ingreso" />

  return children
}
