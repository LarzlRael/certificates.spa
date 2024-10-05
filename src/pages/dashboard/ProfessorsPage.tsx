import useAxiosQueryAuth from '@/hooks/useAuthAxiosQuery'

import { ProfessorInterface } from './interfaces/professors.interface'

import { BecomeProfessor } from './BecomeProfessor'
import { ProfessorsListCard } from '@/custom_components/cards/professorListCard'
import { Button } from '@/components/ui/button'

import {
  withHandleInformation,
  WithSidebarAndInfoProps,
} from '@/HOC/withHandleInformation'

const ProfessorsPageWithHandleInformation = (
  withSidebarAndInfoProps: WithSidebarAndInfoProps,
) => {
  const { changeExtraInformation } = withSidebarAndInfoProps
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
          <ProfessorsListCard professorList={data!} onEdit={() => {}} />
          <Button
            onClick={() => {
              changeExtraInformation(<BecomeProfessor />)
            }}
          >
            Agregar profesor
          </Button>
        </div>
      )}
    </>
  )
}

export const ProfessorsPage = withHandleInformation(
  ProfessorsPageWithHandleInformation,
)
