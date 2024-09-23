import { UserAuth } from '@/interfaces/auth.interface'
import { getAction, postAction } from '@/provider/action/ActionAuthorization'
import { validateStatus } from '@/utils/utils'
import { create } from 'zustand'

enum AuthStatus {
  AUTHENTICATED,
  UNAUTHENTICATED,
  CHECKING,
}

interface AuthState {
  user: UserAuth | null
  authStatus: AuthStatus
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  authStatus: AuthStatus.CHECKING,
  login: async (username, password) => {
    console.log('login')
    const getUserLogging = await postAction('auth/signin', {
      username,
      password,
    })
    console.log(getUserLogging)
    if (validateStatus(getUserLogging!.status)) {
      console.log('login')
      set(() => ({
        user: getUserLogging.data,
        authStatus: AuthStatus.AUTHENTICATED,
      }))
      window.localStorage.setItem('token', get().user?.accessToken ?? '')
    }
  },
  logout: () => null,
  refreshToken: async () => {
    /* const getUserLogging = await getAction('auth/renew-token')
    console.log(getUserLogging)
    if (validateStatus(getUserLogging!.status)) {
      console.log('login')
      set(() => ({
        user: getUserLogging.data,
      }))
      console.log(get().user)
    } */
  },
}))
