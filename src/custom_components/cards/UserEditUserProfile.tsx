import { isValidStatus } from "@/utils/validation/validation";
import { updateUserInformationForm } from "../data/form-pattens";
import { GlobalFormHook } from "../forms/react-form-hooks";

import { putAuthAction } from "@/provider/action/ActionAuthorization";
import { toast } from "sonner";
import { ContentRawInformation } from "./RawInfomation";
import { Mail } from "lucide-react";
import { UserAuth } from "@/interfaces/auth.interface";
import { AvatarEditable } from "../images/AvatarEditable";


interface UserProfileProps {
  userInfo: UserAuth | undefined;
  onReload?: () => void;
}
export const UserEditUserProfile = ({
  userInfo,
  onReload,
}: UserProfileProps) => {
  console.log(userInfo);
  const handleUpdateProfile = async (values:any) => {
    const res = await putAuthAction("users/update-profile-information-from-admin", {
      idUser: userInfo?.id,
      ...values,
    });
    if (!isValidStatus(res.status)) {
      return;
    }
    if (onReload) onReload();
    toast.success("Información actualizada correctamente");
  };
  return (
    <GlobalFormHook
      inputJson={updateUserInformationForm}
      ExtraComponent={
        <>
          <AvatarEditable
            profileImage={userInfo?.profileImageUrl}
            reload={onReload}
          />
          <ContentRawInformation
            label='Correo electrónico'
            value={userInfo?.email}
            icon={<Mail className='h-4 w-4 text-muted-foreground' />}
          />
          <ContentRawInformation
            label='Nombre de usuario'
            value={userInfo?.username}
            icon={<Mail className='h-4 w-4 text-muted-foreground' />}
          />
        </>
      }
      onSubmit={handleUpdateProfile}
      /* formTitle="" */
      isLoading={false}
      data={userInfo}
      titleButton='Actualizar perfil'
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
