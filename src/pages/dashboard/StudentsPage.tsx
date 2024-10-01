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
  const { changeExtraInformation } = useThemeStore()
  /* const { changeDialogInformation } = useThemeStore() */
  /*
  const { changeDialogInformation } = useThemeStore() */
  /* const { setProfileDialog } = useThemeStore() */
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  /* useEffect(() => {
    if (selectedStudent != null) {
      changeExtraInformation({
        isDialogOpen: true,
        content: <UserDialogProfile idStudent={selectedStudent.id} />,
        title: 'Perfil de Usuario',
        subtitle: 'Información personal y de contacto',
      })
    }
  }, [selectedStudent]) */
  useEffect(() => {
    if (selectedStudent != null) {
      changeExtraInformation(
        <UserDialogProfile idStudent={selectedStudent.id} />,
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
                /* setProfileDialog(true) */
                /* changeDialogInformation({
                  subtitle: 'Información del estudiante',
                  title: 'Perfil',
                  content: (
                    <>
                      <h2>Información del estudiante</h2>
                      <label>
                        Nombre: {rowData?.firstName} {rowData?.lastName}
                      </label>
                    </>
                  ),
                }) */
              }}
            />
          </CardContent>
        </Card>
      )}
      {/*       <UserDialogProfile userStudent={selectedStudent} /> */}
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
