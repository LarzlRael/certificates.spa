import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'
import { useParams } from 'react-router-dom'

export const ProfileStudentPage = () => {
  const params = useParams()
  const { idStudent } = params
  const { data, isLoading } = useAxiosQueryAuth({
    url: `/students/student-info/${idStudent}`,
    method: 'GET',
  })
  return <div>

    {isLoading ? (
      <div>Cargando...</div>
    ) : <div>{data.user.username}</div>}
  </div>
}
