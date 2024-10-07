"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useInformationStore } from "@/store/useInformationStore";

export const SheetInformation = () => {
  const { sheetInformation } = useInformationStore();
  const { changeSheetInformation } = useInformationStore();
  const { side, isDialogOpen, description, title, content } = sheetInformation;

  return (
    <Sheet
      open={isDialogOpen}
      onOpenChange={() => {
        if (isDialogOpen) {
          changeSheetInformation({
            isDialogOpen: false,
            title: "",
            description: "",
            content: undefined,
            maxWidth: "425",
            side: "bottom",
            isClosable: true,
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

          {description && (
            <SheetDescription>
              <Label>{description}</Label>
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
