import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ContentRawInformation,
  InfoLabelPresentationCard,
} from "@/custom_components/cards/RawInfomation";
import { CustomTabs } from "@/custom_components/tabs/CustomTab";
import { UserAuth } from "@/interfaces/auth.interface";
import { useAuthStore } from "@/store/authStore";
import { useInformationStore } from "@/store/useInformationStore";

export const AccountPage = () => {
  const { user } = useAuthStore();
  const { changeExtraInformation } = useInformationStore();
  const tabsData = [
    {
      label: "Account",
      component: (
        <ProfileInformation
          user={user!}
          handleInformation={changeExtraInformation}
        />
      ),
    },
    { label: "Password", component: <UserCourses /> },
  ];
  return (
    <div>
      <CustomTabs tabs={tabsData} defaultTab={tabsData[0].label} />
    </div>
  );
};
interface ProfileInformationProps {
  user: UserAuth;
  handleInformation: (extraInformation: React.ReactNode) => void;
}
export const ProfileInformation = ({
  user,
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
        <InfoLabelPresentationCard title='Direccion' value={user.location} />
      </CardContent>
      <CardFooter>
        <Button onClick={() => handleInformation(<div>que fue gente tmre</div>)}>
          Editar perfi
        </Button>
      </CardFooter>
    </Card>
  );
};
export const UserCourses = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. After saving, you'll be logged out.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Label htmlFor='current'>Current password</Label>
          <Input id='current' type='password' />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='new'>New password</Label>
          <Input id='new' type='password' />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save password</Button>
      </CardFooter>
    </Card>
  );
};
