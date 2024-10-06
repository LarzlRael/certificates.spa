"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { CommonInputI } from "./interfaces/form-interface";

interface CheckboxProps extends CommonInputI {
  isLoading: boolean;
  checked: boolean;
}

export const CheckboxField = ({
  control,
  checked,
  label,
  fieldName,
  description,
}: CheckboxProps) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className='flex flex-row items-start space-x-3 space-y-0 p-4'>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className='space-y-1 leading-none'>
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  );
};

{
  /* <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'> */
}
