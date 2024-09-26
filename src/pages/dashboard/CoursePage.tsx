import useAxios from '@/hooks/useAxios'
import { useNavigate } from 'react-router-dom'

import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'

import { CoursesDetailModel } from './interfaces/course.interface'
import { CourseCard } from '@/custom_components/cards/CourseCard'

export const CoursePage = () => {
  const navigate = useNavigate()
  const { data, isLoading, reload } = useAxiosQueryAuth<CoursesDetailModel[]>({
    url: '/course',
  })
  return (
    <div
    /* className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" */
    >
      {isLoading && <h1>Loading...</h1>}
      {data?.map((course) => {
        return (
          /* add card style with twilwing */
          <div
            key={course.id}
            className="hover:text-gray-400"
            onClick={() => {
              console.log(course)
              navigate(`/panel-administrativo/cursos/${course.id}`)
            }}
          >
            <CourseCard {...course} />
          </div>
        )
      })}
    </div>
  )
}
