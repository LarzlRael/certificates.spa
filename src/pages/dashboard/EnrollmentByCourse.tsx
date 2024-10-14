import { useState } from "react";
import { useParams } from "react-router-dom";
import { EnrollmentByCourses, extractOnlyStudents } from "./interfaces/enrollment-by-course-interface";
import useAxiosQueryAuth from "@/hooks/useAuthAxiosQuery";

import { DataTable } from "@/custom_components/data-table/DataTable";
import { columns } from "@/custom_components/data-table/Columns";
import { isValidArray, isValidStatus } from "@/utils/validation/validation";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
/* import { CourseCardPresentation } from '@/custom_components/cards/CourseCardPresentation' */

import { getAuthAction } from "@/provider/action/ActionAuthorization";
import { toast } from "sonner";
import { Bell } from "lucide-react";
export const EnrollmentByCourse = () => {
  const params = useParams();
  const { data, isLoading } = useAxiosQueryAuth<EnrollmentByCourses>({
    url: `/course/course-enrollments-students/${params.idCourse}`,
    method: "GET",
  });
  const [isFetching] = useState<boolean>(false);
  async function sendNotificationCourse() {
    const dataResult = await getAuthAction(
      `notifications/send-new-course-notification/${params.idCourse}`
    );
    if (isValidStatus(dataResult.status)) {
      toast.success("Notificaon enviada");
      return;
    }
    toast.error("Error al enviar la notificacion");
  }

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
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded
          w-80
          '
        >
          <Bell className='mr-2 h-4 w-4' />
          {isFetching ? "Enviando..." : "Enviar notificación del curso"}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {isValidArray(data?.students) ? (
              <DataTable
                columns={columns}
                data={extractOnlyStudents(data!) }
                handleInfo={(rowData) => {
                  console.log(rowData);
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
  );
};
