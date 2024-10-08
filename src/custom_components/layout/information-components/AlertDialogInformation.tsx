import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


import { useInformationStore } from "@/store/useInformationStore";

export const AlertDialogInformation = () => {
  const { alertDialogContent } = useInformationStore();
  const { changeAlertDialogInformation } = useInformationStore();
  const {
    content,
    isOpen,
    subtitle,
    title,
    confirmText,
    cancelText,
    onCancel,
    onConfirm,
  } = alertDialogContent;

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={() => {
        if (isOpen) {
          changeAlertDialogInformation({
            isOpen: false,
            content: undefined,
            title: "",
            subtitle: "",
            onConfirm: undefined,
            onCancel: undefined,
            confirmText: "",
            cancelText: "",
          });
        }
      }}
    >
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content ?? subtitle}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              if (onCancel) {
                onCancel();
              }
            }}
          >
            {cancelText || "Cancelar"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (onConfirm) {
                onConfirm();
              }
            }}
          >
            {confirmText || "Aceptar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
