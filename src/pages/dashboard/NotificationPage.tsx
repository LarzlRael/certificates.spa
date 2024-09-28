import React from 'react'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Bell, Send, Users, AlertTriangle } from 'lucide-react'
/* import { toast } from '@/components/ui/use-toast' */

export const NotificationsPage = () => {
  return (
    <div>
      <NotificationContent />
    </div>
  )
}

// Simulated notification data
const recentNotifications = [
  {
    id: 1,
    title: 'Nuevo curso disponible',
    recipients: 'Todos',
    status: 'Enviado',
    date: '2023-09-20',
  },
  {
    id: 2,
    title: 'Mantenimiento programado',
    recipients: 'Estudiantes',
    status: 'Enviado',
    date: '2023-09-19',
  },
  {
    id: 3,
    title: 'Actualización de política',
    recipients: 'Instructores',
    status: 'Fallido',
    date: '2023-09-18',
  },
  {
    id: 4,
    title: 'Recordatorio de pago',
    recipients: 'Estudiantes con pagos pendientes',
    status: 'Enviado',
    date: '2023-09-17',
  },
]

export const NotificationContent = () => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [recipients, setRecipients] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar la notificación
    console.log('Enviando notificación:', { title, message, recipients })
    /* toast({
      title: 'Notificación enviada',
      description: 'La notificación ha sido enviada exitosamente.',
    }) */
    // Resetear el formulario
    setTitle('')
    setMessage('')
    setRecipients('')
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Enviar Nueva Notificación</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Título
                </label>
                <Input
                  id="title"
                  placeholder="Título de la notificación"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  placeholder="Escribe el mensaje de la notificación aquí..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                />
              </div>
              <div>
                <label
                  htmlFor="recipients"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Destinatarios
                </label>
                <Select value={recipients} onValueChange={setRecipients}>
                  <SelectTrigger id="recipients">
                    <SelectValue placeholder="Seleccionar destinatarios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los usuarios</SelectItem>
                    <SelectItem value="students">Estudiantes</SelectItem>
                    <SelectItem value="instructors">Instructores</SelectItem>
                    <SelectItem value="admins">Administradores</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" /> Enviar Notificación
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas de Notificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-muted rounded-lg">
                <Bell className="h-6 w-6 mr-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Total Enviadas</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-muted rounded-lg">
                <Users className="h-6 w-6 mr-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Alcance</p>
                  <p className="text-2xl font-bold">5,678</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-muted rounded-lg">
                <AlertTriangle className="h-6 w-6 mr-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Tasa de Fallo</p>
                  <p className="text-2xl font-bold">0.5%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
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
                  <TableCell className="font-medium">
                    {notification.title}
                  </TableCell>
                  <TableCell>{notification.recipients}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        notification.status === 'Enviado'
                          ? 'default'
                          : 'destructive'
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
  )
}
