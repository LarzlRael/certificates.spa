import { useParams } from 'react-router-dom'
import { EnrollmentsByCourse } from './interfaces/enrollment-by-course-interface'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'
import { useNavigate } from 'react-router-dom'
export const EnrollmentByCourse = () => {
  const params = useParams()
  const { data, isLoading, reload } = useAxiosQueryAuth<EnrollmentsByCourse>({
    url: `/course/course-enrollments-students/${params.idCourse}`,
    method: 'GET',
  })
  const navigate = useNavigate()
  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <button
          onClick={() => {
            navigate(`/panel-administrativo/cursos/modificar-curso/${data!.id}`)
          }}
        >
          Ir a detailles
        </button>
      )}
    </div>
  )
}
