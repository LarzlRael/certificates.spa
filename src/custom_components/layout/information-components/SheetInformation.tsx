import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useInformationStore } from "@/store/useInformationStore";

export const SheetInformation = () => {
  const { sheetInformation } = useInformationStore();
  const { changeSheetInformation } = useInformationStore();
  const { side, isOpen, subtitle, title, content } = sheetInformation;

  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => {
        if (isOpen) {
          changeSheetInformation({
            isOpen: false,
            title: "",
            subtitle: "",
            content: undefined,
            side: "bottom",
          });
        }
      }}
      key={side}
    >
      {/* <SheetTrigger asChild>
        <Button variant='outline'>{side}</Button>
      </SheetTrigger> */}
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
        <SheetFooter>
          {/* <SheetClose asChild>
            <Button type='submit'>Save changes</Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
