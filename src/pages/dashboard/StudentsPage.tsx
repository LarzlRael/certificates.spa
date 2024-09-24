import useAxios from '@/hooks/useAxios'
import React from 'react'
import { Student } from './interfaces/students.interface'
import useAxiosAuth from '@/hooks/useAxiosAuth'

export const StudentsPage = () => {
  const { response, loading, error, reload } = useAxiosAuth<Student[]>({
    url: `/students/find-students`,
    method: 'GET',
  })
  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {JSON.stringify(response)}
    </div>
  )
}
