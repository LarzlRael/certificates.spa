import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { InfoLabelPresentationCard } from "@/custom_components/cards/RawInfomation";
import { UserEditUserProfile } from "@/custom_components/cards/UserEditUserProfile";
import { CustomTabs } from "@/custom_components/tabs/CustomTab";
import { UserAuth } from "@/interfaces/auth.interface";
import { useAuthStore } from "@/store/authStore";

import {
  SheetInformation,
  useInformationStore,
} from "@/store/useInformationStore";
import { CoursesByUser } from "./MyCourses";
import { useCourseEnrollment } from "@/store/useCourseEnrollment";

export const AccountPage = () => {
  const { user } = useAuthStore();
  const { refreshToken } = useAuthStore();
  const { changeSheetInformation } = useInformationStore();
  const { courseByUser } = useCourseEnrollment();

  const tabsData = [
    {
      label: "Account",
      component: (
        <ProfileInformation
          user={user!}
          onReload={refreshToken}
          handleInformation={changeSheetInformation}
        />
      ),
    },
    { label: "Password", component: <CoursesByUser courses={courseByUser} /> },
  ];
  return (
    <div className="max-w-screen-lg mx-auto">
      <CustomTabs tabs={tabsData} defaultIndex={0} />
    </div>
  );
};
interface ProfileInformationProps {
  user: UserAuth;
  onReload?: () => void;
  handleInformation: (sheetInformation: SheetInformation) => void;
}
export const ProfileInformation = ({
  user,
  onReload,
  handleInformation,
}: ProfileInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <InfoLabelPresentationCard
          title='Nombre'
          value={`${user.firstName} ${user.lastName}`}
        />
        <InfoLabelPresentationCard title='Telefono' value={user.phone} />
        <InfoLabelPresentationCard
          title='Fecha de nacimiento'
          value={user.dateBirth}
        />
        <InfoLabelPresentationCard
          title='Carnet de identidad'
          value={user.dni}
        />
        <InfoLabelPresentationCard title='Dirección' value={user.address} />
        <InfoLabelPresentationCard title='Direccion' value={user.location} />
      </CardContent>
      <CardFooter>
        <Button
          onClick={() =>
            handleInformation({
              isOpen: true,
              title: "Editar perfil",
              /* subtitle: "Make changes to your account here. Click save when you're done.", */
              side: "right",
              content: (
                <UserEditUserProfile userInfo={user} onReload={onReload} />
              ),
            })
          }
        >
          Editar perfil
        </Button>
      </CardFooter>
    </Card>
  );
};
