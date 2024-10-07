import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormCustomInput,
  CustomSelect,
  CustomRadioGroup,
  ReactSelect,
} from "@/custom_components/forms/react-form-hooks";
import { Button } from "@/components/ui/button";
import {
  departamentsOptions,
  federations,
  professorRole,
} from "@/custom_components/data/form-constants";

const formEnrollmentSchema = z.object({
  educationalCore: z.string().min(2, {}),
  role: z.string().min(2, {}),
  typeRole: z.string().min(2, {}),
  department: z.string(),
  district: z.string(),
  federation: z.string().optional(),
});

export const CourseEnrollmentFormPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formEnrollmentSchema>>({
    resolver: zodResolver(formEnrollmentSchema),
    defaultValues: {
      educationalCore: "",
      role: "",
      department: "",
      district: "",
    },
  });
  const handleSubmit = (data: z.infer<typeof formEnrollmentSchema>) => {
    console.log(data);
  };
  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
          {/* Campo de nombre de usuario */}
          <FormCustomInput
            inputType='text'
            isLoading={isLoading}
            control={form.control}
            fieldName='educationalCore'
            label='Su Unidad Educativa/Núcleo:'
            placeholder='Su Unidad Educativa/Núcleo:'
          />
          <FormCustomInput
            inputType='text'
            isLoading={isLoading}
            control={form.control}
            fieldName='district'
            label='Distrito'
            placeholder='Distrito'
          />
          <CustomSelect
            label='Cargo'
            fieldName='role'
            placeholder='Seleccione su cargo'
            control={form.control}
            isLoading={isLoading}
            inputType='select'
            options={professorRole}
          />
          <CustomSelect
            label='Departamento en Bolivia'
            fieldName='department'
            placeholder='Seleccione su departamento'
            control={form.control}
            isLoading={isLoading}
            inputType='select'
            options={departamentsOptions}
          />
          <CustomRadioGroup
            label='Cargo'
            fieldName='typeRole'
            placeholder='Seleccione su cargo'
            control={form.control}
            isLoading={isLoading}
            inputType='select'
            optionsRadio={[
              {
                label: "Urbano",
                value: "urban",
              },
              {
                label: "Rural",
                value: "rural",
              },
            ]}
          />

          {form.getValues().typeRole === "rural" && (
            <ReactSelect
              label='Federación: (si corresponde)'
              fieldName='federation'
              placeholder='Seleccione su federación'
              control={form.control}
              isLoading={isLoading}
              inputType='select'
              options={federations.map((federation) => ({
                key: federation,
                value: federation,
              }))}
            />
          )}

          <Button
            className='flex w-full justify-center rounded-full bg-primary px-3 py-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark'
            disabled={isLoading}
            type='submit'
          >
            Ingresar
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
