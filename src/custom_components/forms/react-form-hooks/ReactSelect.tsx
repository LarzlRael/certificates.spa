import Select from "react-select";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { CommonInputI, OptionsI } from "./interfaces/form-interface";
/* import { Select } from "@/components/ui/select"; */
import { FormCustomInput } from "./FormCustomInput";

interface SelectProps extends CommonInputI {
  options: OptionsI[];
  isLoading: boolean;
}

export const ReactSelect = ({
  label,
  options,
  fieldName,
  description,
  control,
  placeholder,
  isLoading,
}: SelectProps) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      disabled={isLoading}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            placeholder={placeholder || "Selecciona una opción"}
            styles={{}}
            onChange={(e) => field.onChange(e?.value)}
            options={options.map((option) => ({
              value: option.key,
              label: option.value,
            }))}
          />
          {field.value === "Otro" && (
            <FormCustomInput
              inputType='text'
              isLoading={isLoading}
              control={control}
              fieldName='other'
              label={label}
              placeholder={placeholder}
            />
          )}
          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
