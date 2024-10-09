import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { useInformationStore } from "@/store/useInformationStore";

export const SheetInformation = () => {
  const { sheetInformation, changeSheetInformation } = useInformationStore();
  const { side, isOpen, subtitle, title, content } = sheetInformation;

  // Función para cerrar el Sheet con animación
  const handleClose = () => {
    changeSheetInformation({
      ...sheetInformation,
      isOpen: false, // Cambia a false para iniciar la animación de cierre
    });
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleClose(); // Llama a la función para manejar el cierre con animación
        }
      }}
    >
      <SheetContent side={side}>
        <SheetHeader>
          {title && <SheetTitle>{title}</SheetTitle>}
          {subtitle && (
            <SheetDescription>
              <Label>{subtitle}</Label>
            </SheetDescription>
          )}
        </SheetHeader>
        {content}
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
};
