import { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import { PaymentTableInterface } from '../interfaces/payments.interface'
import { FormProvider, useForm } from 'react-hook-form'
import {
  CustomSelect,
  FormCustomInput,
} from '@/custom_components/forms/react-form-hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  BookOpenIcon,
  GraduationCapIcon,
  CreditCardIcon,
  CalendarIcon,
  HashIcon,
  DollarSignIcon,
  FileTextIcon,
  Receipt,
} from 'lucide-react'
import { useInformationStore } from '@/store/useInformationStore'
import { convertDate } from '@/utils/dates'
import { putAction } from '@/provider/action/ActionAuthorization'
import { isValidStatus, isValidString } from '@/utils/validation/validation'
import { toast } from 'sonner'


export const formVerifySchema = z.object({
  idPayment: z.number().positive(),
  amount: z.string(),
  paymentMethod: z.string(),
  status: z.string(),
  description: z.string(),
})
interface VerifyPaymentProps {
  payment: PaymentTableInterface
  onRefresh: () => void
}

export const VerifyPayment = ({ payment, onRefresh}: VerifyPaymentProps) => {
  const { changeDialogInformation } = useInformationStore()
  /* TODO, fix this not changed method is not working changed error */
  const form = useForm<z.infer<typeof formVerifySchema>>({
    resolver: zodResolver(formVerifySchema),
    defaultValues: {
      idPayment: payment.id,
      amount: payment.amount.toString(),
      paymentMethod: payment.paymentMethod || '',
      status: payment.status,
      description: payment.description || '',
    },
  })

  // load data 
  const { reset } = form

  // Usamos useEffect para actualizar los valores del formulario cada vez que cambia 'payment'
  useEffect(() => {
    // Reseteamos los valores del formulario cuando cambia el pago seleccionado
    reset({
      idPayment: payment.id,
      amount: payment.amount.toString(),
      paymentMethod: payment.paymentMethod || '',
      status: payment.status,
      description: payment.description || '',
    })
  }, [payment, reset])

  const handleSubmit = async (values) => {
    console.log(values)
    const res = await putAction('/payment/verify-payment', {
      ...values,
      amount: parseInt(values.amount),
    })
    if (!isValidStatus(res.status)) {
      toast.error('Error al guardar los datos')
      return
    }
    // Si se envió correctamente, recarga la página
    onRefresh()
    toast.success('Datos guardados correctamente')
  }
  const handleError = (errors) => {
    console.error('Validation Errors:', errors)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto max-h-[80vh] overflow-y-auto">
      <CardHeader>
        <CardTitle>Verificación de Pago del Curso</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {/* <div className="flex items-center space-x-3">
            <BookOpenIcon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Curso</p>
              <p className="font-semibold">{payment.courseName}</p>
            </div>
          </div> */}
          <PaymentInfoRow
            label="Curso"
            value={payment.courseName}
            icon={<BookOpenIcon className="h-5 w-5 text-primary" />}
          />
          <PaymentInfoRow
            label="Estudiante"
            value={payment.fullName}
            icon={<GraduationCapIcon className="h-5 w-5 text-primary" />}
          />

          <PaymentInfoRow
            label="Monto Pagado"
            value={payment.amount}
            icon={<CreditCardIcon className="h-5 w-5 text-primary" />}
          />
          <PaymentInfoRow
            label="Fecha de pago"
            value={convertDate(payment.createdAt, 'LLLL')}
            icon={<CalendarIcon className="h-5 w-5 text-primary" />}
          />
          <PaymentInfoRow
            label="Descripcion (Por el supervisor de pagos)"
            value={payment.description}
            icon={<FileTextIcon  className="h-5 w-5 text-primary" />}
          />
          <PaymentInfoRow
            label="Referencia"
            value={payment.transactionReference}
            icon={<HashIcon className="h-5 w-5 text-primary" />}
          />

          <PaymentInfoRow
            label="Metodo de pago"
            value={payment.paymentMethod}
            icon={<DollarSignIcon  className="h-5 w-5 text-primary" />}
          />
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit, handleError)}>
            <CustomSelect
              fieldName="status"
              isLoading={false}
              control={form.control}
              label="Estado "
              placeholder="Selecciona una opcion"
              options={[
                { key: 'Pendiente', value: 'PENDING' },
                { key: 'Confirmado', value: 'CONFIRMED' },
                { key: 'Rechazado', value: 'REJECTED' },
              ]}
            />
            <CustomSelect
              fieldName="paymentMethod"
              isLoading={false}
              control={form.control}
              label="Metodo de pago "
              placeholder="Selecciona una opcion"
              options={[
                { key: 'Transferencia bancaria', value: 'TRANSFER' },
                { key: 'Transferencia via QR', value: 'QR' },
                { key: 'Deposito bancario', value: 'DEPOSIT' },
              ]}
            />
            <FormCustomInput
              fieldName="description"
              isLoading={false}
              control={form.control}
              label="Description"
              placeholder="Descripcion"
            />
            <div>
              {/* TODO: CHANGE THIS */}
              <Label>Comprobante de Pago</Label>
              <br />
              <br />
              <div className="mt-2 border rounded-md overflow-hidden">
                {payment.voucherImageUrl.includes('.pdf') ? (
                  <div>
                    <br />

                    <Button
                      type="button"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 flex items-center space-x-2"
                      onClick={() => {
                        changeDialogInformation({
                          isDialogOpen: true,
                          maxWidth: '800',
                          title: 'Comprobante de pago',
                          content: (
                            <div className="w-full h-full">
                              {payment.voucherImageUrl.includes('.pdf') ? (
                                <iframe
                                  src="https://www.orimi.com/pdf-test.pdf"
                                  className="w-full h-96"
                                  title="Comprobante de pago PDF"
                                ></iframe>
                              ) : (
                                <img
                                  src="payment.voucherImageUrl"
                                  alt="Comprobante de pago"
                                  className="max-w-full h-auto"
                                />
                              )}
                            </div>
                          ),
                        })
                      }}
                    >
                      <Receipt className="w-5 h-5" />
                      Ver Comprobante
                    </Button>
                    <br />
                    <iframe
                      src="https://www.orimi.com/pdf-test.pdf"
                      className="w-full h-96"
                      title="Comprobante de pago PDF"
                      onClick={() =>
                        window.open(
                          'https://www.orimi.com/pdf-test.pdf',
                          '_blank',
                        )
                      }
                    ></iframe>
                  </div>
                ) : (
                  <img
                    src={payment.voucherImageUrl}
                    alt="Comprobante de pago"
                    className="max-w-full h-auto"
                  />
                )}
              </div>
            </div>
            <Button className="w-full">Guardar Cambios</Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

interface PaymentInfoProps {
  label: string
  value: string | null | undefined
  icon: React.ReactNode
}
const PaymentInfoRow = ({ label, value, icon }: PaymentInfoProps) => {
  if (!isValidString(value)) return <div></div>
  return (
    <div className="flex items-center space-x-3">
      {icon}
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  )
}
