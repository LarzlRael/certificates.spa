import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useCourseEnrollment } from '@/store/useCourseEnrollment'

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { refreshToken } = useAuthStore()
  const { changeCourseByUser } = useCourseEnrollment()

  useEffect(() => {
    refreshToken();
    changeCourseByUser();
  }, [])

  return <>{children}</>
}
