import { useState } from 'react'
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
} from 'lucide-react'
import { useInformationStore } from '@/store/useInformationStore'
import { convertDate } from '@/utils/dates'
import { putAction } from '@/provider/action/ActionAuthorization'
import { isValidStatus } from '@/utils/validation/validation'
import { toast } from 'sonner'
/* 
"idPayment":1,
	"amount":70,
	"paymentMethod":"Transaction",
	"status":"CONFIRMED",
	"description":"Pago realizado de forma correcta" */
export const formVerifySchema = z.object({
  idPayment: z.number().positive(),
  amount: z.string(),
  paymentMethod: z.string(),
  status: z.string(),
  description: z.string(),
})
interface VerifyPaymentProps {
  payment: PaymentTableInterface
}

export const VerifyPayment = ({ payment }: VerifyPaymentProps) => {
  const { changeDialogInformation } = useInformationStore()
  const form = useForm<z.infer<typeof formVerifySchema>>({
    resolver: zodResolver(formVerifySchema),
    defaultValues: {
      idPayment: payment.id,
      amount: payment.amount.toString(),
      /* paymentMethod: '', */
      status: payment.status,
      description: '',
    },
  })

  // Simulación de datos pre-cargados

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
          <div className="flex items-center space-x-3">
            <BookOpenIcon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Curso</p>
              <p className="font-semibold">{payment.courseName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <GraduationCapIcon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Estudiante
              </p>
              <p className="font-semibold">{payment.fullName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CreditCardIcon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Monto Pagado
              </p>
              <p className="font-semibold">{payment.amount}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CalendarIcon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Fecha de Pago
              </p>
              <p className="font-semibold">
                {convertDate(payment.createdAt, 'LLLL')}
              </p>
            </div>
          </div>
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
                      onClick={() => {
                        changeDialogInformation({
                          isDialogOpen: true,
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
