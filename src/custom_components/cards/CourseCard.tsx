import { CoursesDetailModel } from '@/pages/dashboard/interfaces/course.interface'
import { isArrayValid } from '@/utils/validation/validation'
import { toCapitalize, toTitleCase } from '@/utils/text-utils'
export const CourseCard = ({
  courseName,
  courseDescription,
  imageUrl,
  professors,
}: CoursesDetailModel) => {
  return (
    <>
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{
          backgroundImage: `url(${
            imageUrl ?? 'https://source.unsplash.com/random'
          })`,
        }}
        title="Woman holding a mug"
      ></div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center">
            <svg
              className="fill-current text-gray-500 w-3 h-3 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Members only
          </p>
          <div className="text-gray-900 font-bold text-xl mb-2">
            {toCapitalize(courseName)}
          </div>
          <p className="text-gray-700 text-base">{courseDescription}</p>
        </div>
        <div className="flex items-center">
          {!isArrayValid(professors)
            ? null
            : professors.map((professor) => (
                <>
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={
                      imageUrl ??
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9gUXKwt2KErC_jWWlkZkGabxpeGchT-fyw&s'
                    }
                    alt={courseName}
                  />
                  <div className="text-sm">
                    <p className="text-gray-900 leading-none">
                      {professor.user?.firstName}
                      {professor.user?.lastName}
                    </p>
                    <p className="text-gray-600">
                      {professor?.professionalTitle}
                    </p>
                  </div>
                </>
              ))}
        </div>
      </div>
    </>
  )
}
