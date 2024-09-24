import useAxios from '@/hooks/useAxios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { EnrollmentsByCourse } from './interfaces/enrollment-by-course-interface'
import useAxiosAuth from '@/hooks/useAxiosAuth'

export const EnrollmentByCourse = () => {
  const params = useParams()
  const { response, loading, reload } = useAxiosAuth<EnrollmentsByCourse>({
    url: `/course/course-enrollments-students/${params.idCourse}`,
    method: 'GET',
  })
  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {JSON.stringify(response)}
    </div>
  )
}
