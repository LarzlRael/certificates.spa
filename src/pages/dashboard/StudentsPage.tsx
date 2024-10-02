import { useState, useEffect } from 'react'
import { DataTable } from '@/custom_components/data-table/DataTable'
import {
  Student,
  UserStudent,
  UserStudentDetail,
} from './interfaces/students.interface'
import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'
import { columns } from '@/custom_components/data-table/Columns'
import { Skeleton } from '@/components/ui/skeleton'
import { useInformationStore } from '@/store/useInformationStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { UserProfile } from '@/custom_components/cards/UserCard'
import { UserDialogProfile } from '@/custom_components/cards/UserProfile'

export const StudentsPage = () => {
  const { data, isLoading, error, reload } = useAxiosQueryAuth<
    UserStudentDetail[]
  >({
    url: `/students/find-students`,
    method: 'GET',
  })
  const { changeExtraInformation } = useInformationStore()
  /* const { changeDialogInformation } = useThemeStore() */
  /*
  const { changeDialogInformation } = useThemeStore() */
  /* const { setProfileDialog } = useThemeStore() */

  console.log('selectedStudent')

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
              data={data?.map((student) => student) || []}
              handleInfo={(rowData) => {
                console.log(rowData)

                changeExtraInformation(
                  <UserDialogProfile
                    studentDetail={rowData}
                    onReload={reload}
                  />,
                )
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
