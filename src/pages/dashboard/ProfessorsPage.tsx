import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'

import { ProfessorInterface } from './interfaces/professors.interface'
import { ProfessorsListCard } from '@/custom_components/cards/professorListCard'

export const ProfessorsPage = () => {
  const { data, isLoading, error, reload } = useAxiosQueryAuth<
    ProfessorInterface[]
  >({
    url: `/professor`,
    method: 'GET',
  })
  return (
    <>
      {isLoading ? (
        <div>cargando</div>
      ) : (
        <div>
          <ProfessorsListCard professorList={data!}/>
          {/* {data.map((professor) => {
            return (
            )
          })} */}
        </div>
      )}
    </>
  )
}
