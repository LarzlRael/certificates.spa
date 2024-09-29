import { Navigate } from 'react-router-dom'
import { AuthStatus, useAuthStore } from '@/store/authStore'
import { LoadingWithLogo } from '@/custom_components/loading/LoadingWithLogo'
import { useEffect } from 'react'

export const PublicRoutes = ({ children }: any) => {
  const { authStatus } = useAuthStore()
  const { refreshToken } = useAuthStore()

  // Asegurarte de que el token se refresque si es necesario
  useEffect(() => {
    refreshToken()
  }, [authStatus, refreshToken])

  // Muestra un loading mientras se determina el estado de autenticación
  if (authStatus === AuthStatus.CHECKING) return <LoadingWithLogo />

  // Si el usuario está autenticado, redirige a la página de inicio o dashboard
  if (authStatus === AuthStatus.AUTHENTICATED) {
    return <Navigate to="/" />
  }

  // Si el usuario no está autenticado, muestra los hijos (login/register)
  return children
}
