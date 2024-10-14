import { useState } from "react";

import { GlobalFormHook } from "@/custom_components/forms/react-form-hooks/";

import { isValidStatus } from "@/utils/validation/validation";
import { toast } from "sonner";

import {
  postAuthAction,
  putAuthAction,
} from "@/provider/action/ActionAuthorization";
import { useInformationStore } from "@/store/useInformationStore";
import { addOrEditProfessor } from "@/custom_components/data/form-pattens";
import { ProfessorI } from "./interfaces/professors.interface";

interface BecomeProfessorProps {
  professorInfo?: ProfessorI;
  handleReload?: () => void;
}
export const BecomeProfessor = ({
  professorInfo,
  handleReload,
}: BecomeProfessorProps) => {
  const { changeDialogInformation } = useInformationStore();
  /* const { changeExtraInformation } = useInformationStore(); */
  const { clearExtraInformation } = useInformationStore();

  const [isLoading, setIsLoading] = useState(false);

  const onUpdateInformation = async (values: any): Promise<boolean> => {
    setIsLoading(true);
    const res = await putAuthAction("/professor", {
      ...values,
    });
    setIsLoading(false);
    return isValidStatus(res.status);
  };
  const onCreateInformation = async (values: any): Promise<boolean> => {
    setIsLoading(true);
    const res = await postAuthAction("/professor", {
      ...values,
    });
    setIsLoading(false);
    return isValidStatus(res.status);
  };

  const handleSubmit = async (values:any) => {
    console.log(values);

    const res = professorInfo
      ? await onUpdateInformation(values)
      : await onCreateInformation(values);

    if (res) {
      changeDialogInformation({
        isOpen: false,
        title: "",
        subtitle: "",
        content: null,
      });
      clearExtraInformation();
      if (handleReload) handleReload();
      toast.success("Se ha actualizado la información correctamente");
    } else {
      toast.error("Ha ocurrido un error al actualizar la información");
    }
  };

  return (
    <>
      <GlobalFormHook
        inputJson={addOrEditProfessor}
        onSubmit={handleSubmit}
        formTitle='Editar información de profesor'
        isLoading={isLoading}
        titleButton='Guardar cambios'
        data={professorInfo}
      />
    </>
  );
};
