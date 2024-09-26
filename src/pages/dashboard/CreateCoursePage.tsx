import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormProvider, useForm, Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormCustomField } from '@/custom_components/forms/FormCustomField'
import { DatePickerWithRange } from '@/custom_components/forms/CalendarRange'
import {
  Select,
  SelectLabel,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select'

import { getDifferenceBetweenDates } from '@/utils/convertDate'
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
import { CourseEnrollInterface } from './interfaces/course-enroll.interface'

export const CreateCoursePage = () => {
  const [isPending, setisPending] = useState(false)
  const params = useParams()
  const {
    data: courseData,
    isLoading: isLoadingCourse,
    reload: reloadCourse,
  } = useAxiosQueryAuth<CourseEnrollInterface>({
    url: `/course/course-detail/${params.idCourse}`,
  })
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
      coursePrice: '',
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
  function handleSubmit(values) {
    processAddCourseData(values)
  }
  function selectProfessors(ids) {
    setSelectProfessor(data.filter((professor) => ids.includes(professor.id)))
  }

  useEffect(() => {
    if (courseData != null || courseData != undefined) {
      form.reset({
        courseName: courseData.courseName || '',
        courseDescription: courseData.courseDescription || '',
        requirements: courseData.requirements || '',
        coursePrice: courseData.coursePrice || '',
        modality: courseData.modality || '',
        notes: courseData.notes || '',
        informationContact: courseData.informationContact || '',
        dateRange: {
          from: courseData.startDate
            ? new Date(courseData.startDate)
            : undefined,
          to: courseData.endDate ? new Date(courseData.endDate) : undefined,
        },
        imageCourse: undefined, // Esto dependerá de cómo manejes las imágenes
        professorsIds: courseData.professors?.map((prof) => prof.id) || [],
      })
      setSelectProfessor(courseData.professors || [])
    }
  }, [courseData, form])

  

  return (
    <div className="bg-white p-4 rounded-lg">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormCustomField
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
                <label className="mb-2 font-semibold text-gray-700">
                  Subir imagen del curso
                </label>
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
          <FormCustomField
            isLoading={isPending}
            control={form.control}
            fieldName="courseDescription"
            label="Descripción"
            placeholder="Descripción"
          />

          <DatePickerWithRange control={form.control} fieldName="dateRange" />

          <FormCustomField
            isLoading={isPending}
            control={form.control}
            fieldName="requirements"
            label="Requisitos"
            placeholder="Requisitos"
          />
          <FormCustomField
            fieldName="coursePrice"
            inputType="number"
            isLoading={isPending}
            control={form.control}
            label="Precio del curso"
            placeholder="Precio del curso"
          />
          <Controller
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
          />

          <FormCustomField
            fieldName="notes"
            isLoading={isPending}
            control={form.control}
            label="Notas"
            placeholder="Notas"
          />
          <FormCustomField
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
    </div>
  )
}
