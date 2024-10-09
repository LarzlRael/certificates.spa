import { useState } from 'react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import {
  FormCustomInput,
  CustomSelect,
  CustomRadioGroup,
  ReactSelect,
} from '@/custom_components/forms/react-form-hooks'
import { Button } from '@/components/ui/button'
import {
  departamentsOptions,
  federations,
  professorRole,
} from '@/custom_components/data/form-constants'
import {
  postAction,
  getAuthAction,
} from '@/provider/action/ActionAuthorization'
import { isValidStatus } from '@/utils/validation/validation'
import { FormEnrollmentInterface } from '@/interfaces/form-response'
import { toast } from 'sonner'

const formEnrollmentSchema = z.object({
  educationalCore: z.string().min(2, {}),
  role: z.string().min(2, {}),
  typeRole: z.string().min(2, {}),
  department: z.string(),
  district: z.string(),
  federation: z.string().optional(),
})
interface CourseEnrollmentFormPageProps {
  idCourse: number
}
export const CourseEnrollmentFormPage = ({
  idCourse,
}: CourseEnrollmentFormPageProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formEnrollmentSchema>>({
    resolver: zodResolver(formEnrollmentSchema),
    defaultValues: {
      educationalCore: '',
      role: '',
      department: '',
      district: '',
    },
  })

  const watchedFormValues = form.watch()

  const handleSubmit = async (data: z.infer<typeof formEnrollmentSchema>) => {
    try {
      const enrollForm = await postAction<FormEnrollmentInterface>(
        'form/create-new-form',
        {
          ...data,
          idCourse: idCourse,
        },
      )
      if (!isValidStatus(enrollForm.status)) {
        toast.error('Hubo un error al enviar el formulario')
        return
      }
      const enrollmentCreatedForm = await getAuthAction<
        FormEnrollmentInterface
      >(`enrollment/enroll-course/${enrollForm!.data!.id}`)
      if (!isValidStatus(enrollmentCreatedForm.status)) {
        toast.error('Hubo un error al enviar el formulario')
        return
      }
      toast.success('Curso inscrito correctamente')
    } catch (error) {
      console.error(error)
      toast.error('Hubo un error al enviar el formulario')
    }
  }
  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Campo de nombre de usuario */}
          <FormCustomInput
            inputType="text"
            isLoading={isLoading}
            control={form.control}
            fieldName="educationalCore"
            label="Su Unidad Educativa/Núcleo:"
            placeholder="Su Unidad Educativa/Núcleo:"
          />
          <FormCustomInput
            inputType="text"
            isLoading={isLoading}
            control={form.control}
            fieldName="district"
            label="Distrito"
            placeholder="Distrito"
          />
          <CustomSelect
            label="Cargo"
            fieldName="role"
            placeholder="Seleccione su cargo"
            control={form.control}
            isLoading={isLoading}
            inputType="select"
            options={professorRole}
          />
          <CustomSelect
            label="Departamento en Bolivia"
            fieldName="department"
            placeholder="Seleccione su departamento"
            control={form.control}
            isLoading={isLoading}
            inputType="select"
            options={departamentsOptions}
          />
          <CustomRadioGroup
            label="Cargo"
            fieldName="typeRole"
            placeholder="Seleccione su cargo"
            control={form.control}
            isLoading={isLoading}
            inputType="select"
            optionsRadio={[
              {
                label: 'Urbano',
                value: 'urban',
              },
              {
                label: 'Rural',
                value: 'rural',
              },
            ]}
          />

          {watchedFormValues.typeRole === 'rural' && (
            <ReactSelect
              label="Federación: (si corresponde)"
              fieldName="federation"
              placeholder="Seleccione su federación"
              control={form.control}
              isLoading={isLoading}
              inputType="select"
              options={federations.map((federation) => ({
                key: federation,
                value: federation,
              }))}
            />
          )}

          <Button
            className="flex w-full justify-center rounded-full bg-primary px-3 py-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
            disabled={isLoading}
            type="submit"
          >
            Ingresar
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
