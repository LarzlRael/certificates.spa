/* import { AuthStatus, useAuthStore } from '@/store/authStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  const AuthHOC: React.FC<T> = (props) => {
    const { authStatus, refreshToken } = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
      const checkAuthStatus = async () => {
        if (authStatus === AuthStatus.CHECKING) {
          await refreshToken()
        }

        if (authStatus === AuthStatus.UNAUTHENTICATED) {
          navigate('/login') // Cambia '/login' por tu ruta de inicio de sesión
        }
      }

      checkAuthStatus()
    }, [authStatus, refreshToken, navigate])

    if (authStatus === AuthStatus.CHECKING) {
      return <div>Loading...</div>
    }

    return authStatus === AuthStatus.AUTHENTICATED ? (
      <WrappedComponent {...props} />
    ) : null
  }

  return AuthHOC
}
 */