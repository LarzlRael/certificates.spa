import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  FormCustomInput,
  FormCustomArea,
  CustomSelect,
  FileUploadInput,
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
  sendFileFormData,
  formEditCourseSchema,
} from './utils/processDataCourse'
import { useParams } from 'react-router-dom'
import { CourseEnrollInterface } from './interfaces/course-enroll.interface'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { FormLabel } from '@/components/ui/form'
import { putAction } from '@/provider/action/ActionAuthorization'
import { isValidStatus } from '@/utils/validation/validation'
import { PreviewCourseCardPresentation } from '@/custom_components/cards/PreviewCourseCardPresentation'
import {
  WithSidebarAndInfoProps,
  withHandleInformation,
} from '@/HOC/withHandleInformation'
import { Loading3dots } from '@/custom_components/loading/Loading3dots'

 const EditCoursePageHoc = (
  informationHandleProps: WithSidebarAndInfoProps,
) => {
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

  const form = useForm<z.infer<typeof formEditCourseSchema>>({
    resolver: zodResolver(formEditCourseSchema),
    defaultValues: {
      id: parseInt(params.idCourse || '0'),
      courseName: '',
      courseDescription: '',
      requirements: '',
      coursePrice: 0,
      modality: '',
      notes: '',
      imageCourseUrl: '',
      informationContact: '',
      dateRange: {
        from: undefined,
        to: undefined,
      },
      imageCourse: undefined,
    },
  })
  const watchedFormValues = form.watch()

  async function handleSubmit(values) {
    /* console.log(values) */
    const data = processAddCourseData(values)
    const sendData = await putAction(
      `/course/update-course-info/${values.id}`,
      data,
    )
    if (values.imageCourse != undefined) {
      const sendData = await putAction(
        `/course/update-course-image-info/${values.id}`,
        sendFileFormData('imageCourse', values.imageCourse),
      )
    }
    if (isValidStatus(sendData.status)) {
      // Si se envió correctamente, recarga la página
      /* reloadCourse() */
    }
  }

  function selectProfessors(ids) {
    console.log(ids)

    setSelectProfessor(
      data.filter((professor) => ids.includes(professor.idProfessor)),
    )
  }

  useEffect(() => {
    if (courseData != null) {
      form.reset({
        id: courseData.id || 0,
        courseName: courseData.courseName || '',
        courseDescription: courseData.courseDescription || '',
        requirements: courseData.requirements || '',
        coursePrice: courseData.coursePrice || 0,
        duration: courseData.duration || 0,
        durationUnit: courseData.durationUnit || '',
        startDate: courseData.startDate || new Date(),
        endDate: courseData.endDate || new Date(),
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
        imageCourseUrl: courseData.imageUrl || '',
      })
      /* setSelectProfessor(courseData.professors || []) */
    }
  }, [courseData])

  return (
    <div className="w-full">
      {isLoadingCourse ? (
        <div>Cargando</div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Editar información del curso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row w-full gap-4">
              {/* El formulario ocupará 1/4 en pantallas grandes */}
              <div className="w-full lg:w-1/4">
                <FormProvider {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-2"
                  >
                    <Button type="button" onClick={() => {
                      informationHandleProps.changeDialogInformation({
                        isDialogOpen:true,
                        /* isPreventClose: false, */
                        content: <Loading3dots />,
                      })
                    }}>
                      Probar loading
                    </Button>
                    <FormCustomArea
                      isLoading={isPending}
                      control={form.control}
                      rows={2}
                      fieldName="courseName"
                      label="Nombre del curso"
                      placeholder="Nombre del curso"
                    />

                    {isLoading ? (
                      <div>Cargando</div>
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

                    <FileUploadInput
                      fieldName="imageCourse"
                      control={form.control}
                      isLoading={isPending}
                      label="Subir imagen del curso"
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
                      isLoading={false}
                      control={form.control}
                      label="Modalidad"
                      placeholder="Selecciona una opción"
                      options={[
                        { key: 'Virtual', value: 'VIRTUAL' },
                        { key: 'Presencial', value: 'PRESENTIAL' },
                      ]}
                    />

                    <FormCustomArea
                      fieldName="notes"
                      isLoading={isPending}
                      control={form.control}
                      label="Notas"
                      placeholder="Notas"
                      rows={4}
                    />
                    <FormCustomInput
                      fieldName="informationContact"
                      isLoading={isPending}
                      control={form.control}
                      label="Información de contacto"
                      placeholder="Información de contacto"
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

              {/* La previsualización ocupará 3/4 en pantallas grandes */}
              <div className="w-full lg:w-3/4">
                <PreviewCourseCardPresentation
                  imageBlog={
                    watchedFormValues.imageCourse == undefined
                      ? ''
                      : URL.createObjectURL(watchedFormValues.imageCourse)
                  }
                  courseInfo={{
                    ...watchedFormValues,
                    startDate: watchedFormValues.dateRange?.from,
                    endDate: watchedFormValues.dateRange?.to,

                    professors: selectProfessor.map((prof) => ({
                      id: prof.id,
                      professionalTitle: prof.professionalTitle,
                      expertise: prof.expertise,
                      user: {
                        firstName: prof.firstName,
                        lastName: prof.lastName,
                        profileImageUrl: prof.profileImageUrl,
                      },
                    })),
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export const EditCoursePage = withHandleInformation(EditCoursePageHoc)