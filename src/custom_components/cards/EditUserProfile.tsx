import { z } from "zod";
import { isValidStatus } from "@/utils/validation/validation";
import { updateUserInformationForm } from "../data/form-pattens";
import { GlobalFormHook } from "../forms/react-form-hooks";

import { UserStudentDetail } from "@/pages/dashboard/interfaces/students.interface";
import { putAuthAction } from "@/provider/action/ActionAuthorization";
import { toast } from "sonner";
import { ContentRawInformation } from "./RawInfomation";
import { Mail } from "lucide-react";
import { AvatarEditable } from "../images/AvatarEditable";
import { useState } from "react";

export const updateUserProfileSchema = z.object({
  firstName: z.string().min(3).max(50).optional(),
  lastName: z.string().min(3).max(50).optional(),
  address: z.string().max(100).optional(),
  phone: z.string().max(8).optional(),
  shippingAddress: z.string().max(100).optional(),
  /* addressCoordinates: z
    .object({
      latitude: z.string(),
      longitude: z.string(),
    })
    .optional(), // Hacemos que este campo sea opcional */
});
interface UserProfileProps {
  userInfo: UserStudentDetail | undefined;
  onReload?: () => void;
}
export const EditUserProfile = ({ userInfo, onReload }: UserProfileProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async (values) => {
    try {
      setIsLoading(true);
      const res = await putAuthAction('users/update-profile-information-from-admin', {
        idUser: userInfo?.id,
        ...values,
      })
      setIsLoading(false);
      if (!isValidStatus(res.status)) {
        toast.error("Error al actualizar el perfil");
        return;
      }
      toast.success("Perfil actualizado correctamente");
      if (onReload) onReload();
    } catch (error) {
      setIsLoading(false);
      toast.error("Error al actualizar el perfil");
    }
  };
  return (
    <GlobalFormHook
      inputJson={updateUserInformationForm}
      ExtraComponent={
        <>
          <ContentRawInformation
            label='Correo electrónico'
            value={userInfo?.email}
            icon={<Mail className='h-4 w-4 text-muted-foreground' />}
          />
          <ContentRawInformation
            label='Nombre de usuario'
            value={userInfo?.phone}
            icon={<Mail className='h-4 w-4 text-muted-foreground' />}
          />
        </>
      }
      onSubmit={handleUpdateProfile}
      formTitle='Editar información de Perfil'
      isLoading={isLoading}
      data={userInfo}
      schema={updateUserProfileSchema}
      titleButton='Editar información'
    />
  );
};

/* interface UserProfileRawInfoProps {
  value?: string | undefined | null
  icon?: any
}
export const UserProfileRawInfo = ({
  value,
  icon,
}: UserProfileRawInfoProps) => {
  if (!isValidString(value)) return <div></div>
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{value}</span>
    </div>
  )
}
 */
