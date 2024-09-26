"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
/* import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts' */
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, ShoppingCart, Activity, Menu, X, Bell, Settings, HelpCircle, LogOut } from 'lucide-react'

const data = [
  { name: 'Ene', ventas: 4000 },
  { name: 'Feb', ventas: 3000 },
  { name: 'Mar', ventas: 5000 },
  { name: 'Abr', ventas: 4500 },
  { name: 'May', ventas: 6000 },
  { name: 'Jun', ventas: 5500 },
]

const actividadesRecientes = [
  { id: 1, usuario: "María L.", accion: "Realizó una compra", tiempo: "Hace 5 minutos" },
  { id: 2, usuario: "Juan P.", accion: "Se registró", tiempo: "Hace 15 minutos" },
  { id: 3, usuario: "Ana S.", accion: "Dejó una reseña", tiempo: "Hace 1 hora" },
]

const notificaciones = [
  { id: 1, titulo: "Nuevo mensaje", descripcion: "Tienes un nuevo mensaje de soporte", tiempo: "Hace 10 minutos" },
  { id: 2, titulo: "Actualización del sistema", descripcion: "Se ha programado una actualización para mañana", tiempo: "Hace 1 hora" },
  { id: 3, titulo: "Recordatorio", descripcion: "Reunión de equipo a las 15:00", tiempo: "Hace 2 horas" },
]

export default function DashboardConSidebars() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar izquierdo */}
      <aside className={`bg-white w-64 min-h-screen p-4 ${leftSidebarOpen ? '' : 'hidden'}`}>
        <nav className="mt-8">
          <Button variant="ghost" className="w-full justify-start mb-2">
            <DollarSign className="mr-2 h-4 w-4" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Users className="mr-2 h-4 w-4" /> Usuarios
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <ShoppingCart className="mr-2 h-4 w-4" /> Ventas
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Settings className="mr-2 h-4 w-4" /> Configuración
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <HelpCircle className="mr-2 h-4 w-4" /> Ayuda
          </Button>
        </nav>
        <div className="absolute bottom-4">
          <Button variant="ghost" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
          </Button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div>
            <Button variant="ghost" size="icon" onClick={() => setLeftSidebarOpen(!leftSidebarOpen)} className="mr-2">
              <Menu className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setRightSidebarOpen(!rightSidebarOpen)}>
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +20.1%
                </span>{" "}
                desde el último mes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nuevos Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500 inline-flex items-center">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  -3.2%
                </span>{" "}
                desde la semana pasada
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +10.5%
                </span>{" "}
                desde ayer
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.24%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +2.5%
                </span>{" "}
                desde el último trimestre
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Ventas</CardTitle>
              <CardDescription>Ventas mensuales del último semestre</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
          {/*     <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="ventas" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Actividades Recientes</CardTitle>
              <CardDescription>Últimas acciones de los usuarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actividadesRecientes.map((actividad) => (
                  <div key={actividad.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={actividad.usuario} />
                      <AvatarFallback>{actividad.usuario.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{actividad.usuario}</p>
                      <p className="text-sm text-muted-foreground">{actividad.accion}</p>
                    </div>
                    <div className="ml-auto font-medium text-sm text-muted-foreground">
                      {actividad.tiempo}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button>Ver Reporte Completo</Button>
        </div>
      </main>

      {/* Sidebar derecho */}
      <aside className={`bg-white w-64 min-h-screen p-4 ${rightSidebarOpen ? '' : 'hidden'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Notificaciones</h2>
          <Button variant="ghost" size="icon" onClick={() => setRightSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {notificaciones.map((notificacion) => (
            <Card key={notificacion.id}>
              <CardHeader>
                <CardTitle className="text-sm">{notificacion.titulo}</CardTitle>
                <CardDescription className="text-xs">{notificacion.tiempo}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{notificacion.descripcion}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </aside>
    </div>
  )
}