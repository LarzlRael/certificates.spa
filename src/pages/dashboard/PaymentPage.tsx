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
import { Calendar as CalendarIcon, Download } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { PaymentTableInterface } from './interfaces/payments.interface'
import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'
import { convertDate } from '@/utils/dates'
import { capitalizeString } from '@/utils/utils'
import { useNavigate } from 'react-router-dom'
import { TableMain } from '@/table'

export const PaymentsPage = () => {
  return (
    <div>
      <PaymentView />
    </div>
  )
}

export const PaymentView = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)

  const { data, isLoading, reload } = useAxiosQueryAuth<
    PaymentTableInterface[]
  >({
    url: `/payment/get-payments`,
  })
  const navigate = useNavigate()
  const filteredPayments = data
    ? data.filter((flatPayment) => {
        return (
          (flatPayment.fullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            flatPayment.courseName
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
          (statusFilter === '' || flatPayment.status === statusFilter) &&
          (!dateFilter ||
            format(new Date(flatPayment.createdAt), 'yyyy-MM-dd') ===
              format(dateFilter, 'yyyy-MM-dd'))
        )
      })
    : []

  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + parseFloat(payment.amount),
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
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="CONFIRMED">Completado</SelectItem>
              <SelectItem value="PENDING">Pendiente</SelectItem>
              <SelectItem value="REJECTED">Fallido</SelectItem>
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

      {isLoading ? (
        <>cargando</>
      ) : (
        <TableMain
          tableHeaders={[
            { key: 'id', name: 'ID' },
            { key: 'fullName', name: 'Cliente' },
            { key: 'courseName', name: 'Curso' },
            { key: 'amount', name: 'Monto' },
            {
              key: 'status',
              name: 'Estado',
              type: 'ReactNode',
              childrenAction: (element) => (
                <BadgeStatus status={element.status} />
              ),
            },

            {
              key: 'createdAt',
              name: 'Creado en ',
              type: 'date',
              dateFormatter: 'LLLL',
            },
          ]}
          data={filteredPayments}
          handleInfo={(element) => {
            console.log(element)
          }}
        />
      )}

      <div className="mt-4 flex justify-end">
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar Datos
        </Button>
      </div>
    </div>
  )
}

interface BadgeStatusProps {
  status: string // Usa el tipo definido aquí
}

export const BadgeStatus = ({ status }: BadgeStatusProps) => {
  const badgeMap: Record<string, string> = {
    PENDING: 'secondary',
    CONFIRMED: 'default',
    REJECT: 'destructive',
  }
  const translationMap: Record<string, string> = {
    PENDING: 'pendiente',
    CONFIRMED: 'confirmado',
    REJECT: 'rechazado',
  }

  return (
    <Badge variant={badgeMap[status]}>
      {translationMap[status].toUpperCase()}
    </Badge>
  )
}
