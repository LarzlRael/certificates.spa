import Select from "react-select";

import {
  /* FormControl, */
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CommonInputI } from "./interfaces/form-interface";
/* import { Select } from "@/components/ui/select"; */
import { FormCustomInput } from "./FormCustomInput";
import useAxiosQueryAuth from "@/hooks/useAuthAxiosQuery";

export interface CourseNameI {
  id: number;
  courseName: string;
}
interface SelectProps extends CommonInputI {
  url: string;
  isLoading: boolean;
}

const generateOptions = (data: CourseNameI[]) =>
  data.map(({ id, courseName }) => ({ value: id, label: courseName }));

export const ReactSelectFetch = ({
  label,
  url,
  fieldName,
  description,
  control,
  placeholder,
  isLoading,
}: SelectProps) => {
  const { data, isLoading: isLoadingFetch } = useAxiosQueryAuth<CourseNameI[]>({
    url: url,
    method: "GET",
  });
  
  return (
    <>
      {isLoadingFetch ? (
        <div>Loading...</div>
      ) : (
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
                options={generateOptions(data!)}
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
      )}
    </>
  );
};
