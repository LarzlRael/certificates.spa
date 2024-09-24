
import { useParams } from 'react-router-dom'
import { EnrollmentsByCourse } from './interfaces/enrollment-by-course-interface'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'

export const EnrollmentByCourse = () => {
  const params = useParams()
  const { data, isLoading, reload } = useAxiosQueryAuth<EnrollmentsByCourse>({
    url: `/course/course-enrollments-students/${params.idCourse}`,
    method: 'GET',
  })
  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {JSON.stringify(data)}
    </div>
  )
}
