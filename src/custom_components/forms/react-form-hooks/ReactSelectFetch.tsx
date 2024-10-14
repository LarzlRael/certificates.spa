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
import { ShortCoursesInfoI } from "@/interfaces/courses.interface";

interface SelectProps extends CommonInputI {
  url: string;
  isLoading: boolean;
}

const generateOptions = (data: ShortCoursesInfoI[]) =>
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
  const { data, isLoading: isLoadingFetch } = useAxiosQueryAuth<
    ShortCoursesInfoI[]
  >({
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
            <FormItem className='py-2'>
              <FormLabel className='block text-sm font-medium leading-5 text-gray-900 text-left -mb-1'>
                {label}
              </FormLabel>
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
