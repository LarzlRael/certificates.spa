import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'

import { ProfessorInterface } from './interfaces/professors.interface'
import { ProfessorsListCard } from '@/custom_components/cards/ProfessorListCard'
import { useInformationStore } from '@/store/useInformationStore'
import { BecomeProfessor } from './BecomeProfessor'

export const ProfessorsPage = () => {
  const { data, isLoading, error, reload } = useAxiosQueryAuth<
    ProfessorInterface[]
  >({
    url: `/professor`,
    method: 'GET',
  })
  const { changeDialogInformation } = useInformationStore()

  return (
    <>
      {isLoading ? (
        <div>cargando</div>
      ) : (
        <div>
          <ProfessorsListCard
            professorList={data!}
            onEdit={()=>{}}
          />
        </div>
      )}
    </>
  )
}
