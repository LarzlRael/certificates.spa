import useAxios from '@/hooks/useAxios'
import { useNavigate } from 'react-router-dom'

import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'

import {
  CourseInfoInterface,
  CoursesDetailModel,
} from './interfaces/course.interface'
import { CourseCard, CourseList } from '@/custom_components/cards/CourseCard'
import { Button } from '@/components/ui/button'

export const CoursePage = () => {
  const navigate = useNavigate()
  const { data, isLoading, error, reload } = useAxiosQueryAuth<
    CourseInfoInterface[]
  >({
    url: `/course/course-info`,
    method: 'GET',
  })
  return (
    <div
    /* className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" */
    >
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Button
            onClick={() => navigate('/panel-administrativo/cursos/crear-curso')}
          >
            Añadir Nuevo Curso
          </Button>
          <CourseList
            courseInfo={data!}
            onEdit={(idCourse) =>
              navigate(
                `/panel-administrativo/cursos/modificar-curso/${idCourse}`,
              )
            }
            onClick={(idCourse) =>
              navigate(`/panel-administrativo/cursos/${idCourse}`)
            }
          />
        </div>
      )}
    </div>
  )
}
