import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar as CalendarIcon, Download, Search } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'

export const PaymentsPage = () => {
  return (
    <div>
      <PaymentView />
    </div>
  )
}

// Simulated payment data
const payments = [
  {
    id: 1,
    date: '2023-09-15',
    amount: 199.99,
    status: 'Completado',
    customer: 'Juan Pérez',
    course: 'Desarrollo Web Fullstack',
  },
  {
    id: 2,
    date: '2023-09-16',
    amount: 149.99,
    status: 'Pendiente',
    customer: 'María García',
    course: 'Diseño UX/UI',
  },
  {
    id: 3,
    date: '2023-09-17',
    amount: 299.99,
    status: 'Completado',
    customer: 'Carlos Rodríguez',
    course: 'Machine Learning Avanzado',
  },
  {
    id: 4,
    date: '2023-09-18',
    amount: 99.99,
    status: 'Fallido',
    customer: 'Ana Martínez',
    course: 'Introducción a Python',
  },
  {
    id: 5,
    date: '2023-09-19',
    amount: 179.99,
    status: 'Completado',
    customer: 'Luis Sánchez',
    course: 'Marketing Digital',
  },
]

export const PaymentView = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)

  const filteredPayments = payments.filter(
    (payment) =>
      (payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.course.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === '' || payment.status === statusFilter) &&
      (!dateFilter || payment.date === format(dateFilter, 'yyyy-MM-dd')),
  )

  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  )
  const completedPayments = filteredPayments.filter(
    (payment) => payment.status === 'Completado',
  ).length
  const pendingPayments = filteredPayments.filter(
    (payment) => payment.status === 'Pendiente',
  ).length

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Panel de Administración de Pagos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Recaudado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pagos Completados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedPayments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pagos Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayments}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 w-full md:w-auto">
          <Input
            placeholder="Buscar por cliente o curso..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex space-x-2 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Estado del pago" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="Completado">Completado</SelectItem>
              <SelectItem value="Pendiente">Pendiente</SelectItem>
              <SelectItem value="Fallido">Fallido</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full md:w-[180px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFilter ? format(dateFilter, 'PP') : 'Seleccionar fecha'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateFilter}
                onSelect={setDateFilter}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('')
              setStatusFilter('')
              setDateFilter(undefined)
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.customer}</TableCell>
                  <TableCell>{payment.course}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payment.status === 'Completado'
                          ? 'default'
                          : payment.status === 'Pendiente'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-4 flex justify-end">
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar Datos
        </Button>
      </div>
    </div>
  )
}
