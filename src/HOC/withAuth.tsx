import { UserAuth } from '@/interfaces/auth.interface'
import { AuthStatus, useAuthStore } from '@/store/authStore'
import { ComponentType, FC } from 'react'

/* import { AuthStatus } from '@/store/auth.store' */

export interface WithAuthProps {
  user: UserAuth | null
  authStatus: AuthStatus
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
}

export function withAuth<T extends WithAuthProps>(
  Component: ComponentType<T>,
): FC<Omit<T, keyof WithAuthProps>> {
  return function WithAuth(props: Omit<T, keyof WithAuthProps>) {
    const user = useAuthStore((state) => state.user)
    const authStatus = useAuthStore((state) => state.authStatus)
    const login = useAuthStore((state) => state.login)
    const logout = useAuthStore((state) => state.logout)
    const refreshToken = useAuthStore((state) => state.refreshToken)

    return (
      <Component
        {...(props as T)}
        user={user}
        authStatus={authStatus}
        login={login}
        logout={logout}
        refreshToken={refreshToken}
      />
    )
  }
}
