import { useParams } from 'react-router-dom'
import {
  EnrollmentsByCourse,
  extractOnlyStudents,
} from './interfaces/enrollment-by-course-interface'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'
import { useNavigate } from 'react-router-dom'
import { DataTable } from '@/custom_components/data-table/DataTable'
import { columns } from '@/custom_components/data-table/Columns'
import { isValidArray } from '@/utils/validation/validation'
import { UserStudent } from './interfaces/students.interface'
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
        <>
          <button
            onClick={() => {
              navigate(
                `/panel-administrativo/cursos/modificar-curso/${data!.id}`,
              )
            }}
          >
            Ir a detalles
          </button>
          {isValidArray(data?.forms) ? (
            <DataTable
              columns={columns}
              data={extractOnlyStudents(data) as UserStudent}
              handleInfo={(rowData) => {
                /* setSelectedStudent(rowData) */
              }}
            />
          ) : (
            <h1>No hay estudiantes inscritos</h1>
          )}
        </>
      )}
    </div>
  )
}
