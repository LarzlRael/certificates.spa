import { getDifferenceBetweenDates } from '@/utils/dates'
import { z } from 'zod'

export const formAddCourseSchema = z.object({
  courseName: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  courseDescription: z.string().min(3),
  requirements: z.string().min(3).optional(),

  // Convertimos el precio de string a número
  coursePrice: z.string(),

  modality: z.string(),
  notes: z.string().optional(),
  informationContact: z.string().optional(),

  dateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),

  imageCourse: z.instanceof(File).optional(),

  professorsIds: z.array(z.number().positive()).optional(),
})
export const formEditCourseSchema = z.object({
  id: z.number().positive(),
  courseName: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  courseDescription: z.string().min(3),
  requirements: z.string().min(3).optional(),

  // Convertimos el precio de string a número
  coursePrice: z.string(),

  modality: z.string(),
  notes: z.string().optional(),
  informationContact: z.string().optional(),

  dateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),

  imageCourse: z.instanceof(File).optional(),
  professorsIds: z.array(z.number().positive()).optional(),
  imageCourseUrl: z.string().optional(),
})

interface partialFormAddCourseSchema
  extends z.infer<typeof formAddCourseSchema> {
  startDate: Date
  endDate: Date
}

export const processAddCourseData = (
  data: z.infer<typeof formAddCourseSchema>,
) => {
  const { dateRange } = data
  const { startDate, endDate, days, months } = getDifferenceBetweenDates(
    dateRange?.from,
    dateRange?.to,
  )
  const courseData: partialFormAddCourseSchema = {
    ...data,
    startDate,
    endDate,
    /* duration: days,
    durationUnit: 'DAYS', */
  }
  delete courseData.dateRange
  delete courseData.imageCourseUrl
  console.log(courseData)

  return courseData
}

export const sendFileFormData = (fieldName: string, file: any) => {
  const formData = new FormData()
  formData.append(fieldName, file)
  return formData
}
