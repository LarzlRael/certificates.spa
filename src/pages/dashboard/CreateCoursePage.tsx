import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormProvider, useForm, Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  FormCustomInput,
  FormCustomArea,
} from '@/custom_components/forms/react-form-hooks/'
import { DatePickerWithRange } from '@/custom_components/forms/react-form-hooks/CalendarRange'

import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'
import { ProfessorInterface } from './interfaces/professors.interface'
import ProfessorsCard, {
  ProfessorCardMini,
} from '@/custom_components/cards/ProfessorCards'
import {
  formAddCourseSchema,
  processAddCourseData,
} from './utils/processDataCourse'
import { useParams } from 'react-router-dom'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { FormLabel } from '@/components/ui/form'
import { postAction } from '@/provider/action/ActionAuthorization'
import { isValidStatus } from '@/utils/validation/validation'
import { CustomSelect } from '@/custom_components/forms/react-form-hooks/Select'

export const CreateCoursePage = () => {
  const [isPending, setisPending] = useState(false)

  const { data, isLoading, reload } = useAxiosQueryAuth<ProfessorInterface[]>({
    url: '/professor',
  })
  const [selectProfessor, setSelectProfessor] = useState<ProfessorInterface[]>(
    [],
  )

  const form = useForm<z.infer<typeof formAddCourseSchema>>({
    resolver: zodResolver(formAddCourseSchema),
    defaultValues: {
      courseName: '',
      courseDescription: '',
      requirements: '',
      coursePrice: '0',
      modality: '',
      notes: '',
      informationContact: '',
      dateRange: {
        from: undefined,
        to: undefined,
      },
      imageCourse: undefined,
    },
  })
  async function handleSubmit(values) {
    const sendData = await postAction('/course', processAddCourseData(values))
    if (isValidStatus(sendData.status)) {
      // Si se envió correctamente, recarga la página
      /* reloadCourse() */
    }
  }

  function selectProfessors(ids) {
    setSelectProfessor(data.filter((professor) => ids.includes(professor.id)))
  }

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Crear nuevo curso</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-2"
            >
              <FormCustomInput
                isLoading={isPending}
                control={form.control}
                fieldName="courseName"
                label="Nombre del curso"
                placeholder="Nombre del curso"
              />

              {isLoading ? (
                <div>cargando</div>
              ) : (
                <ProfessorsCard
                  professorsList={data}
                  selectProfessors={(ids) => {
                    form.setValue('professorsIds', ids)
                    selectProfessors(ids)
                  }}
                />
              )}
              <ProfessorCardMini
                professorsList={selectProfessor}
                selectProfessors={(professor) => {}}
              />
              <Controller
                name="imageCourse"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <FormLabel className="block text-sm font-medium leading-6 text-gray-900 text-left">
                      Subir imagen del curso
                    </FormLabel>
                    <input
                      type="file"
                      accept="image/*" // Solo acepta imágenes
                      onChange={(e) => {
                        const file = e.target.files[0] // Tomar solo el primer archivo
                        field.onChange(file) // Actualiza el estado del formulario con el archivo seleccionado
                      }}
                      className="border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {field.value && (
                      <div className="relative w-full max-w-sm">
                        <img
                          src={URL.createObjectURL(field.value)} // Crea una URL temporal para mostrar la imagen
                          alt={field.value.name}
                          className="w-full h-auto rounded-lg shadow-md"
                        />
                        <p className="mt-2 text-center text-gray-500">
                          {field.value.name}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              />
              <FormCustomInput
                isLoading={isPending}
                control={form.control}
                fieldName="courseDescription"
                label="Descripción"
                placeholder="Descripción"
              />

              <DatePickerWithRange
                control={form.control}
                fieldName="dateRange"
              />

              <FormCustomInput
                isLoading={isPending}
                control={form.control}
                fieldName="requirements"
                label="Requisitos"
                placeholder="Requisitos"
              />
              <FormCustomInput
                fieldName="coursePrice"
                inputType="number"
                isLoading={isPending}
                control={form.control}
                label="Precio del curso"
                placeholder="Precio del curso"
              />

              <CustomSelect
                fieldName="modality"
                isLoading={isPending}
                control={form.control}
                label="Modalidad"
                placeholder="Selecciona una opcion"
                options={[
                  { key: 'Virtual', value: 'VIRTUAL' },
                  { key: 'Presencial', value: 'PRESENTIAL' },
                ]}
              />
              {/* <Controller
                name="modality" // Nombre del campo en el schema del form
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[240px]">
                      <SelectValue placeholder="Modalidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Modalidad</SelectLabel>
                        <SelectItem value="VIRTUAL">Virtual</SelectItem>
                        <SelectItem value="PRESENTIAL">Presencial</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              /> */}

              <FormCustomArea
                fieldName="notes"
                isLoading={isPending}
                control={form.control}
                label="Notas"
                placeholder="Notas"
              />
              <FormCustomInput
                fieldName="informationContact"
                isLoading={isPending}
                control={form.control}
                label="Informacion de contacto"
                placeholder="Informacion de contacto"
              />

              <Button
                className="flex w-full justify-center rounded-full bg-primary px-3 py-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
                disabled={isPending}
                type="submit"
              >
                Crear curso
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}
