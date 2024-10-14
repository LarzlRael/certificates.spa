import useAxiosQueryAuth from "@/hooks/useAuthAxiosQuery";

import { ProfessorI } from "./interfaces/professors.interface";

import { BecomeProfessor } from "./BecomeProfessor";
import { ProfessorsListCard } from "@/custom_components/cards/professorListCard";
import { Button } from "@/components/ui/button";

import {
  withHandleInformation,
  WithSidebarAndInfoProps,
} from "@/HOC/withHandleInformation";

const ProfessorsPageWithHandleInformation = (
  withSidebarAndInfoProps: WithSidebarAndInfoProps
) => {
  const { changeExtraInformation } = withSidebarAndInfoProps;
  const { data, isLoading, reload } = useAxiosQueryAuth<ProfessorI[]>({
    url: `/professor`,
    method: "GET",
  });

  return (
    <>
      {isLoading ? (
        <div>cargando</div>
      ) : (
        <div>
          <ProfessorsListCard
            professorList={data!}
            onEdit={(selectProfessor) => {
              changeExtraInformation({
                isOpen: true,
                content: (
                  <BecomeProfessor
                    professorInfo={selectProfessor}
                    handleReload={reload}
                  />
                ),
              });
            }}
          />
          <Button
            onClick={() => {
              changeExtraInformation({
                isOpen: true,
                content: <BecomeProfessor handleReload={reload} />,
              });
            }}
          >
            Agregar profesor
          </Button>
        </div>
      )}
    </>
  );
};

export const ProfessorsPage = withHandleInformation(
  ProfessorsPageWithHandleInformation
);
