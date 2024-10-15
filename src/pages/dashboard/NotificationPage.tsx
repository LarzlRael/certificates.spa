import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { GlobalFormHook } from "@/custom_components/forms/react-form-hooks";
import { sendNotificationForm } from "@/custom_components/data/form-pattens";
import { postAuthAction } from "@/provider/action/ActionAuthorization";
import { toast } from "sonner";
import { isValidStatus } from "@/utils/validation/validation";
import useAxiosQueryAuth from "@/hooks/useAuthAxiosQuery";
import { TableMain } from "@/table";
import { PhonePreview } from "@/custom_components/cards/PhonePreview";
import { ShortCoursesInfoI } from "@/interfaces/courses.interface";
import { SkeletonLoadingTable } from "@/custom_components/loading/QuickActionSkeleton";
/* import { toast } from '@/components/ui/use-toast' */

export interface NotificationI {
  id: number;
  title: string;
  body: string;
  imageUrl: null | string;
  createdAt: Date;
}

export const NotificationsPage = () => {
  return (
    <div>
      <NotificationContent />
    </div>
  );
};

// Simulated notification data
/* const recentNotifications = [
  {
    id: 1,
    title: "Nuevo curso disponible",
    recipients: "Todos",
    status: "Enviado",
    date: "2023-09-20",
  },
  {
    id: 2,
    title: "Mantenimiento programado",
    recipients: "Estudiantes",
    status: "Enviado",
    date: "2023-09-19",
  },
  {
    id: 3,
    title: "Actualización de política",
    recipients: "Instructores",
    status: "Fallido",
    date: "2023-09-18",
  },
  {
    id: 4,
    title: "Recordatorio de pago",
    recipients: "Estudiantes con pagos pendientes",
    status: "Enviado",
    date: "2023-09-17",
  },
]; */

export const NotificationContent = () => {
  const [isLoading, isSetLoading] = useState(false);
  const [formValuesWatch, setFormValuesWatch] = useState<any>();

  const {
    data,
    isLoading: isLoadingGetNotification,
    /* error,
    reload, */
  } = useAxiosQueryAuth<NotificationI[]>({
    url: "notifications/get-last-notification",
    method: "GET",
  });

  const { data: dataCourses, isLoading: isLoadingCourses } = useAxiosQueryAuth<
    ShortCoursesInfoI[]
  >({
    url: "course/find-all-courses-names",
    method: "GET",
  });

  const handleWatchChange = (values: any) => {
    if (!isLoadingCourses) {
      const findImage = dataCourses!.find(
        (value) => value.id === values.idCourse
      );
      setFormValuesWatch({
        ...values,
        imageUrl: findImage?.imageUrl,
      });
    }
  };

  const handleSubmit = async (values) => {
    try {
      isSetLoading(true); // Mostrar loading

      const res = await postAuthAction(
        `notifications/send-notification-to-course-participants/${values.idCourse}`,
        values
      );
      isSetLoading(false);
      if (!isValidStatus(res.status)) {
        toast.error("Ocurrió un error al enviar la notificación");
        return;
      }
      toast.success("Notificación enviada exitosamente");
    } catch (error) {
      console.error(error);

      toast.error("Ocurrió un error al enviar la notificación");
    } finally {
      isSetLoading(false);
    }
  };

  return (
    <div className='container'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          {/* <CardHeader>
            <CardTitle>Enviar Nueva Notificación</CardTitle>
          </CardHeader> */}
          <CardContent>
           <div className="mx-auto">
           <GlobalFormHook
              formTitle='Enviar Nueva Notificación'
              onWatchChange={handleWatchChange}
              inputJson={sendNotificationForm}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              titleButton='Enviar Notificación'
            />
           </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            {/* <CardTitle>Estadísticas de Notificaciones</CardTitle> */}
            <CardTitle>Vista previea</CardTitle>
          </CardHeader>
          <CardContent>
            <PhonePreview
              imageUrl={formValuesWatch?.imageUrl || undefined}
              title={formValuesWatch?.title || undefined}
              body={formValuesWatch?.body || undefined}
            />
          </CardContent>
        </Card>
      </div>

      <Card className='mt-6'>
        <CardHeader>
          <CardTitle>Notificaciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Destinatarios</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentNotifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell className='font-medium'>
                    {notification.title}
                  </TableCell>
                  <TableCell>{notification.recipients}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        notification.status === "Enviado"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {notification.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{notification.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
          <div className='mt-0'>
            {/* <CardHeader>
              <CardTitle>Notificaciones Recientes</CardTitle>
            </CardHeader> */}
            
              {isLoadingGetNotification ? (
                <div>
                <SkeletonLoadingTable columns={4} rows={3} />
                </div>
              ) : (
                <TableMain
                  tableHeaders={[
                    { key: "title", name: "Titulo" },
                    { key: "title", name: "Destinatarios" },
                    { key: "body", name: "Contenido" },

                    {
                      name: "Creado en ",
                      key: "createdAt",
                      type: "date",
                      dateFormatter: "DD/MM/yyyy",
                    },
                  ]}
                  data={data!}
                  /* handleInfo={(element) => {
            changeSheetInformation({
              isOpen: true,
              content: <VerifyPayment payment={element} onRefresh={reload}/>,
              title: "Verificar Pago",
              subtitle: `Pago de ${element.fullName} por el curso ${element.courseName}`,
              
            });
          }} */
                />
              )}
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
