import { DataTable } from '@/custom_components/data-table/DataTable'
import { Student } from './interfaces/students.interface'
import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'
import { columns } from '@/custom_components/data-table/Columns'
import { Skeleton } from '@/components/ui/skeleton'

export const StudentsPage = () => {
  const { data, isLoading, error, reload } = useAxiosQueryAuth<Student[]>({
    url: `/students/find-students`,
    method: 'GET',
  })
  return (
    <div>
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <DataTable
          columns={columns}
          data={data?.map((student) => student.user) || []}
          handleInfo={(rowData) => {
            console.log(rowData)
          }}
        />
      )}
    </div>
  )
}

export const SkeletonLoading = () => {
  return (
    <>
      {'123456789'.split('').map((item, index) => (
        <div key={index} className="flex items-center space-x-4 my-4">
          <Skeleton className="w-10 h-10 rounded-full" />{' '}
          {/* Simula una imagen o avatar */}
          {'123456'.split('').map((subItem, subIndex) => (
            <Skeleton key={subIndex} className="w-20 h-5" />
          ))}
        </div>
      ))}
    </>
  )
}

{
  /* <DataTable
          columns={columns}
          data={data?.map((student) => student.user) || []}
        /> */
}
