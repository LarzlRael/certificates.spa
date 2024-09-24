import useAxios from '@/hooks/useAxios'
import { CoursesDetailModel } from './interfaces/course.interface'
import { useNavigate, useNavigation } from 'react-router-dom'

export const CoursePage = () => {
  const navigate = useNavigate()
  const { response, loading, reload } = useAxios<CoursesDetailModel[]>({
    url: '/course',
  })
  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {response?.map((course) => {
        return (
          /* add card style with twilwing */
          <div
            key={course.id}
            className="hover:text-gray-400"
            onClick={() => {
              console.log(course)
              navigate(`/dashboard/cursos/${course.id}`)
            }}
          >
            <h1>{course.courseName}</h1>
            <p>{course.courseDescription}</p>
            <p>{course.coursePrice}</p>
            <p>{course.duration}</p>
            <p>{course.durationUnit}</p>
            <p>{course.modality}</p>

            <img
              src={
                course.imageUrl != null
                  ? course.imageUrl
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9gUXKwt2KErC_jWWlkZkGabxpeGchT-fyw&s'
              }
              alt={course.courseName}
            />

            <h2>Professors</h2>
            {course.professors.map((professor) => {
              return (
                <div key={professor.id}>
                  <p>{professor.professionalTitle}</p>
                  <p>
                    {professor.user?.firstName} {professor.user?.lastName}
                  </p>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
