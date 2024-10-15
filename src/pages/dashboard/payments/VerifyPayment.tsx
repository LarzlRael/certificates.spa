import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  /* CardFooter,
  CardHeader,
  CardTitle, */
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { PaymentTableInterface } from "../interfaces/payments.interface";
import { FormProvider, useForm } from "react-hook-form";
import {
  CustomSelect,
  FormCustomInput,
} from "@/custom_components/forms/react-form-hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  BookOpenIcon,
  GraduationCapIcon,
  CreditCardIcon,
  CalendarIcon,
  HashIcon,
  DollarSignIcon,
  FileTextIcon,
  /* Receipt, */
} from "lucide-react";
import { useInformationStore } from "@/store/useInformationStore";
import { convertDate } from "@/utils/dates";
import { putAuthAction } from "@/provider/action/ActionAuthorization";
import { isValidStatus, isValidString } from "@/utils/validation/validation";
import { toast } from "sonner";
import { ContentRawInformation } from "@/custom_components/cards/RawInfomation";

export const formVerifySchema = z.object({
  idPayment: z.number().positive(),
  amount: z.number().positive(),
  paymentMethod: z.string(),
  status: z.string(),
  description: z.string(),
});
interface VerifyPaymentProps {
  payment: PaymentTableInterface;
  onRefresh: () => void;
}

export const VerifyPayment = ({ payment, onRefresh }: VerifyPaymentProps) => {
  const { changeDialogInformation } = useInformationStore();
  const { clearDialogInformation } = useInformationStore();

  const [isFetching, setIsFetching] = useState(false);

  const form = useForm<z.infer<typeof formVerifySchema>>({
    resolver: zodResolver(formVerifySchema),
    defaultValues: {
      idPayment: payment.id,
      amount: payment.amount || 0,
      paymentMethod: payment.paymentMethod || "",
      status: payment.status,
      description: payment.description || "",
    },
  });

  // load data
  const { reset } = form;

  // Usamos useEffect para actualizar los valores del formulario cada vez que cambia 'payment'
  useEffect(() => {
    // Reseteamos los valores del formulario cuando cambia el pago seleccionado
    reset({
      idPayment: payment.id,
      amount: payment.amount || 0,
      paymentMethod: payment.paymentMethod || "",
      status: payment.status,
      description: payment.description || "",
    });
  }, [payment, reset]);

  const handleSubmit = async (values) => {
    setIsFetching(true);
    changeDialogInformation({
      isOpen: true,

      /* TODO improve this view */
      content: <div>Cargando...</div>,
    });
    const res = await putAuthAction("/payment/verify-payment", {
      ...values,
      amount: parseInt(values.amount),
    });
    setIsFetching(false);

    clearDialogInformation();

    if (!isValidStatus(res.status)) {
      toast.error("Error al guardar los datos");
      return;
    }
    // Si se envió correctamente, recarga la página
    onRefresh();
    toast.success("Datos guardados correctamente");
  };
  const handleError = (errors) => {
    console.error("Validation Errors:", errors);
  };

  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>Verificación de Pago del Curso</CardTitle>
      </CardHeader> */}
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-4'>
          <ContentRawInformation
            label='Curso'
            value={payment.courseName}
            icon={<BookOpenIcon className='h-5 w-5 text-primary' />}
          />
          <ContentRawInformation
            label='Estudiante'
            value={payment.fullName}
            icon={<GraduationCapIcon className='h-5 w-5 text-primary' />}
          />

          <ContentRawInformation
            label='Monto Pagado'
            value={
              isValidString(payment.amount) ? payment.amount.toString() : null
            }
            icon={<CreditCardIcon className='h-5 w-5 text-primary' />}
          />
          <ContentRawInformation
            label='Fecha de pago'
            value={convertDate(payment.createdAt, "LLLL")}
            icon={<CalendarIcon className='h-5 w-5 text-primary' />}
          />
          <ContentRawInformation
            label='Descripcion (Por el supervisor de pagos)'
            value={payment.description}
            icon={<FileTextIcon className='h-5 w-5 text-primary' />}
          />
          <ContentRawInformation
            label='Referencia'
            value={payment.transactionReference}
            icon={<HashIcon className='h-5 w-5 text-primary' />}
          />

          <ContentRawInformation
            label='Metodo de pago'
            value={payment.paymentMethod}
            icon={<DollarSignIcon className='h-5 w-5 text-primary' />}
          />
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit, handleError)}>
            <CustomSelect
              inputType='select'
              fieldName='paymentMethod'
              isLoading={isFetching}
              control={form.control}
              label='Metodo de pago '
              placeholder='Selecciona una opcion'
              options={[
                { key: "Transferencia bancaria", value: "TRANSFER" },
                { key: "Transferencia via QR", value: "QR" },
                { key: "Deposito bancario", value: "DEPOSIT" },
              ]}
            />
            <FormCustomInput
              inputType='text'
              fieldName='description'
              isLoading={isFetching}
              control={form.control}
              label='Description'
              placeholder='Descripcion'
            />
            <FormCustomInput
              fieldName='amount'
              inputType='number'
              isLoading={isFetching}
              control={form.control}
              label='Monto'
              placeholder='Monto'
            />
            <CustomSelect
              fieldName='status'
              isLoading={isFetching}
              control={form.control}
              label='Estado '
              placeholder='Selecciona una opción'
              options={[
                { key: "Pendiente", value: "PENDING" },
                { key: "Confirmado", value: "CONFIRMED" },
                { key: "Rechazado", value: "REJECTED" },
              ]}
            />
            <div>
              {/* TODO: CHANGE THIS */}
              <Label>Comprobante de Pago</Label>
              <br />
              <br />
              {isValidString(payment.voucherImageUrl) && (
                <div className='mt-2 rounded-md overflow-hidden'>
                  <VoucherViewer
                    onClick={() => {
                      if (!isValidString(payment.voucherImageUrl)) {
                        return;
                      }
                      changeDialogInformation({
                        isOpen: true,
                        isClosable: true,
                        maxWidth: "800",
                        title: "Comprobante de pago",
                        content: (
                          <VoucherViewer voucherUrl={payment.voucherImageUrl} />
                        ),
                      });
                    }}
                    voucherUrl={payment.voucherImageUrl}
                  />
                </div>
              )}
            </div>
            <Button disabled={isFetching} className='w-full my-5'>
              Guardar Cambios
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

interface VoucherViewerProps {
  voucherUrl: string;
  onClick?: () => void;
}

export const VoucherViewer = ({ onClick, voucherUrl }: VoucherViewerProps) => {
  const isPdf = voucherUrl.includes(".pdf");

  return (
    <div
      onClick={onClick}
      className='w-full h-full cursor-pointer border border-transparent transition duration-300 ease-in-out hover:border-primary rounded-md'
    >
      {isPdf ? (
        <iframe
          src={voucherUrl}
          className='w-full h-96'
          title='Comprobante de pago PDF'
        ></iframe>
      ) : (
        <img
          src={voucherUrl}
          alt='Comprobante de pago'
          className='max-w-full h-auto'
        />
      )}
    </div>
  );
};
