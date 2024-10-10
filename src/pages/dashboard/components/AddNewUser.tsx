import { addNewUser } from "@/custom_components/data/form-pattens";
import { GlobalFormHook } from "@/custom_components/forms/react-form-hooks/GlobalFormHook";
import { postAuthAction } from "@/provider/action/ActionAuthorization";
import { useInformationStore } from "@/store/useInformationStore";
import { isValidStatus } from "@/utils/validation/validation";
import { useState } from "react";
import { toast } from "sonner";

interface AddNewUserProps {
  onReload?: () => void;
}
export const AddNewUser = ({ onReload }: AddNewUserProps) => {
  const { clearDialogInformation } = useInformationStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    console.log("values :", values);
    setIsLoading(true);
    try {
      const res = await postAuthAction("/auth/register-user-by-admin", values);

      setIsLoading(false);
      if (!isValidStatus(res.status)) {
        toast.error("Error al añadir el usuario");
        return;
      }
      if (onReload) onReload();
      clearDialogInformation();
      toast.success("Usuario añadido correctamente");
    } catch (error) {
      console.error("Error :", error);
      setIsLoading(false);
    }
  };

  return (
    <GlobalFormHook
      inputJson={addNewUser}
      isLoading={isLoading}
      titleButton='Guardar'
      onSubmit={handleSubmit}
      formTitle='Añadir usuario'
      /* schema={addNewUserSchema} */
    />
  );
};
