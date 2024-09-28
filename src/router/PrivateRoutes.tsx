import { Navigate } from 'react-router-dom'

import { useEffect } from 'react'

import { AuthStatus, useAuthStore } from '@/store/authStore'
import { LoadingWithLogo } from '@/custom_components/loading/LoadingWithLogo'

export const PrivateRoutes = ({ children }: any) => {
  const { authStatus } = useAuthStore()
  const { refreshToken } = useAuthStore()

  useEffect(() => {
    refreshToken()
    /* if (authStatus === AuthStatus.AUTHENTICATED) {
      navigate('/dashboard')
    } */
  }, [authStatus])

  if (authStatus === AuthStatus.CHECKING) return <LoadingWithLogo />

  if (authStatus === AuthStatus.UNAUTHENTICATED)
    return <Navigate to="/ingreso" />

  return children
}
