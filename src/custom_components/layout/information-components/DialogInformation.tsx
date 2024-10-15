import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useInformationStore } from "@/store/useInformationStore";

export const DialogInformation = () => {
  const { dialogContent } = useInformationStore();
  const { changeDialogInformation } = useInformationStore();
  const { maxWidth, title, subtitle, content, isOpen, isClosable } =
    dialogContent;

  return (
    <Dialog
      open={isOpen}
      modal={!isClosable}
      onOpenChange={() => {
        if (!isClosable) {
          changeDialogInformation({
            isOpen: false,
            isClosable: true,
            content: undefined,
            title: "",
            subtitle: "",
          });
        }
      }}
    >
      <DialogTrigger asChild>
        {/* <Button variant="outline">Ver Perfil de Usuario</Button> */}
      </DialogTrigger>
      {/* Usar min-width */}
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        <Card className='w-full'>{content}</Card>
      </DialogContent>
    </Dialog>
  );
};
