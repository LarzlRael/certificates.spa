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
            onEdit={(selectProfessor) => {
              changeDialogInformation({
                isDialogOpen: true,
                title: 'Editar profesor',
                subtitle: 'Información personal y de contacto',
                content: (
                  <BecomeProfessor
                    expertise={selectProfessor.expertise}
                    professionalTitle={selectProfessor.professionalTitle}
                    userStudent={{
                      id: selectProfessor.id,
                      idStudent: 0,
                      firstName: selectProfessor.firstName || '',
                      lastName: selectProfessor.lastName || '',
                      username: selectProfessor.username,
                      profileImageUrl: selectProfessor.profileImageUrl || '',
                      email: '',
                      phone: '',
                      address: '',
                      createdAt: new Date(),
                      roles: [],
                    }}
                  />
                ),
              })
            }}
          />
        </div>
      )}
    </>
  )
}
