import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { convertToSlug } from '@/utils/text-utils'
import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'
import { CourseEnrollInterface } from './dashboard/interfaces/course-enroll.interface'

export const CourseEnrollment = () => {
  const params = useParams<{ idCourse: string; courseName?: string }>()
  const navigate = useNavigate()

  const { data, isLoading } = useAxiosQueryAuth<CourseEnrollInterface>({
    url: `/course/course-detail/${params.idCourse}`,
    method: 'GET',
  })

  // Usamos useEffect para redirigir una vez que obtengamos el nombre del curso
  useEffect(() => {
    if (data && data.courseName && !params.courseName) {
      // Redirige a la nueva URL que contiene el courseName y el idCourse
      const newUrl = `/inscripcion/${convertToSlug(data.courseName)}/${
        params.idCourse
      }`
      navigate(newUrl, { replace: true }) // Reemplaza para no guardar la URL anterior en el historial
    }
  }, [data, params, navigate])

  return (
    <div>
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : (
        <div>
          <h1>{data?.courseName}</h1>
          <p>{data?.courseDescription}</p>
          
        </div>
      )}
    </div>
  )
}
