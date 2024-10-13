import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bell, Send, Users, AlertTriangle } from "lucide-react";
import { GlobalFormHook } from "@/custom_components/forms/react-form-hooks";
import { sendNotificationForm } from "@/custom_components/data/form-pattens";
import { postAuthAction } from "@/provider/action/ActionAuthorization";
import { toast } from "sonner";
import { isValidStatus } from "@/utils/validation/validation";
/* import { toast } from '@/components/ui/use-toast' */

export const NotificationsPage = () => {
  return (
    <div>
      <NotificationContent />
    </div>
  );
};

// Simulated notification data
const recentNotifications = [
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
];

export const NotificationContent = () => {
  const [isLoading, isSetLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      console.log(values);
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
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Enviar Nueva Notificación</CardTitle>
          </CardHeader>
          <CardContent>
            <GlobalFormHook
              inputJson={sendNotificationForm}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              titleButton='Enviar Notificación'
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas de Notificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='flex items-center p-4 bg-muted rounded-lg'>
                <Bell className='h-6 w-6 mr-4 text-primary' />
                <div>
                  <p className='text-sm font-medium'>Total Enviadas</p>
                  <p className='text-2xl font-bold'>1,234</p>
                </div>
              </div>
              <div className='flex items-center p-4 bg-muted rounded-lg'>
                <Users className='h-6 w-6 mr-4 text-primary' />
                <div>
                  <p className='text-sm font-medium'>Alcance</p>
                  <p className='text-2xl font-bold'>5,678</p>
                </div>
              </div>
              <div className='flex items-center p-4 bg-muted rounded-lg'>
                <AlertTriangle className='h-6 w-6 mr-4 text-primary' />
                <div>
                  <p className='text-sm font-medium'>Tasa de Fallo</p>
                  <p className='text-2xl font-bold'>0.5%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className='mt-6'>
        <CardHeader>
          <CardTitle>Notificaciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
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
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
