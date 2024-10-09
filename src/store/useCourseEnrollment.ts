import { create } from 'zustand'

import { validateStatus } from '@/utils/utils'
import { getAuthAction } from '@/provider/action/ActionAuthorization'
import { EnrollmentByUser } from '@/interfaces/enrollment.interface'

interface State {
  courseByUser: EnrollmentByUser[]
  isLoading: boolean
  changeCourseByUser: () => Promise<void>
  /* changeLoading: (loading: boolean) => void */
}

export const useCourseEnrollment = create<State>((set) => ({
  courseByUser: [],
  isLoading: false,

  // Función para cambiar el estado de carga
  /*  changeLoading: (loading: boolean) => {
    set(() => ({
      isLoading: loading,
    }))
  }, */

  // Función para obtener los cursos del usuario
  changeCourseByUser: async () => {
    // Activar el estado de carga
    set({ isLoading: true })

    try {
      const getUserLogging = await getAuthAction<EnrollmentByUser[]>(
        'enrollment/enrollments-by-user-id',
      )

      // Verificar el estatus de la respuesta
      if (validateStatus(getUserLogging!.status)) {
        set(() => ({
          courseByUser: getUserLogging.data || [], // Guardar los datos
        }))
      } else {
        set(() => ({
          courseByUser: [], // En caso de fallo, vacío la lista
        }))
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
      set(() => ({
        courseByUser: [], // En caso de error, vacío la lista
      }))
    } finally {
      // Desactivar el estado de carga
      set({ isLoading: false })
    }
  },
}))
