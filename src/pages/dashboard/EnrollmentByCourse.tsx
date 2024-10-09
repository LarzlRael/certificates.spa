import { useParams } from 'react-router-dom'
import {
  EnrollmentsByCourse,
  extractOnlyStudents,
} from './interfaces/enrollment-by-course-interface'
import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { useNavigate } from 'react-router-dom'
import { DataTable } from '@/custom_components/data-table/DataTable'
import { columns } from '@/custom_components/data-table/Columns'
import { isValidArray, isValidStatus } from '@/utils/validation/validation'
import { UserStudent } from './interfaces/students.interface'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { CourseCardPresentation } from '@/custom_components/cards/CourseCardPresentation'
import { Button } from '@/components/ui/button'
import { useMutationQuery } from '@/hooks/useMutationQuery'

import { getAuthAction } from '@/provider/action/ActionAuthorization'
import { toast } from 'sonner'
import { Bell } from 'lucide-react'
export const EnrollmentByCourse = () => {
  const params = useParams()
  const { data, isLoading, reload } = useAxiosQueryAuth<EnrollmentsByCourse>({
    url: `/course/course-enrollments-students/${params.idCourse}`,
    method: 'GET',
  })
  async function sendNotificationCourse() {
    const dataResult = await getAuthAction(
      `notifications/send-new-course-notification/${params.idCourse}`,
    )
    if (isValidStatus(dataResult.status)) {
      toast.success('Notificaon enviada')
      return
    }
    toast.error('Error al enviar la notificacion')
  }

  /* const { mutateAsync: loginUser, isPending } = useMutationQuery<
    UserAuthStatus,
    z.infer<typeof formSchema>
  >({
    mutationFn: sendNotificationCourse,
    onSuccess: async () => {},
    onError: (_) => {
      
    },
  }) */
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de estudiantes</CardTitle>
        {/* <Button onClick={sendNotificationCourse}>
          Mandar notificaciones para este curso
        </Button> */}
        <Button 
          onClick={sendNotificationCourse} 
          disabled={false}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded
          w-80
          "
        >
          <Bell className="mr-2 h-4 w-4" />
          {false ? "Enviando..." : "Enviar notificación del curso"}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
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
            {/* <CourseCardPresentation courseInfo={data} /> */}
          </>
        )}
      </CardContent>
    </Card>
  )
}
