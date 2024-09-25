import { DataTable } from '@/custom_components/data-table/DataTable'
import { Student } from './interfaces/students.interface'
import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'
import { columns } from '@/custom_components/data-table/Columns'

export const StudentsPage = () => {
  const { data, loading, error, reload } = useAxiosQueryAuth<Student[]>({
    url: `/students/find-students`,
    method: 'GET',
  })
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <DataTable
          columns={columns}
          
          data={data?.map((student) => student.user) || []}
        />
      )}
    </div>
  )
}
