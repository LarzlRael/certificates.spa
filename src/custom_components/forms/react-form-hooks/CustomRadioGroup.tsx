import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CommonInputI } from "./interfaces/form-interface";

export interface RadioOption {
  value: string;
  label: string;
}
interface CustomRadioGroupProps extends CommonInputI {
  isLoading: boolean;
  optionsRadio: RadioOption[];
}

export function CustomRadioGroup({
  control,
  isLoading,
  label,
  placeholder,
  fieldName,
  optionsRadio
}: CustomRadioGroupProps) {
  return (
    <FormField
      disabled={isLoading}
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className='space-y-3'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className='flex flex-row space-y-1'
            >
              {optionsRadio.map((option) => (
                <FormItem
                  key={option.value}
                  className='flex items-center space-x-3 space-y-0'
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className='font-normal cursor-pointer'>{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
