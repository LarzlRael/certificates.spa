import { useState, useEffect } from 'react'
import { DataTable } from '@/custom_components/data-table/DataTable'
import { Student, UserStudent } from './interfaces/students.interface'
import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'
import { columns } from '@/custom_components/data-table/Columns'
import { Skeleton } from '@/components/ui/skeleton'
import { useThemeStore } from '@/store/themeStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { UserProfile } from '@/custom_components/cards/UserCard'
import { UserDialogProfile } from '@/custom_components/cards/UserProfile'

export const StudentsPage = () => {
  const { data, isLoading, error, reload } = useAxiosQueryAuth<Student[]>({
    url: `/students/find-students`,
    method: 'GET',
  })
  const { changeInformationInfo } = useThemeStore()
  const [selectedStudent, setSelectedStudent] = useState<UserStudent>(null)

  useEffect(() => {
    if (selectedStudent != null) {
      changeInformationInfo(
        <div>
          <h1>{selectedStudent.username}</h1>
          <p>{selectedStudent.email}</p>
        </div>,
      )
    }
  }, [selectedStudent])
  return (
    <div>
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Lista de estudiantes</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={data?.map((student) => student.user) || []}
              handleInfo={(rowData) => {
                setSelectedStudent(rowData)
              }}
            />
          </CardContent>
        </Card>
      )}
      {/* <UserDialogProfile /> */}
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
