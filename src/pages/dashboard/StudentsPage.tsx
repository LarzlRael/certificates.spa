import useAxios from '@/hooks/useAxios'
import React from 'react'
import { Student } from './interfaces/students.interface'
import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'


export const StudentsPage = () => {
  const { data, loading, error, reload } = useAxiosQueryAuth<Student[]>({
    url: `/students/find-students`,
    method: 'GET',
  })
  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {JSON.stringify(data)}
    </div>
  )
}
