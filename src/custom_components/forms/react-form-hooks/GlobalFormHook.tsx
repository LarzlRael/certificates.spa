import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import {
  FormCustomInput,
  CustomSelect,
  FormCustomArea,
  FileUploadInput,
  CheckboxMultiple,
  CheckboxField,
  CalendarField,
  CalendarDayPicker,
} from "./";
import { Button } from "@/components/ui/button";
import { FormInterface } from "./interfaces/form-interface";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { isValidString } from "@/utils/validation/validation";

export const GlobalFormHook = ({
  inputJson,
  onSubmit,
  data,
  formTitle,
  isLoading,
  titleButton,
  schema,
  ExtraComponent,
  extraComponentPosition = "top",
}: FormInterface) => {
  const defaultValues = inputJson.reduce((acc, item) => {
    // Si existe data y contiene el campo, usamos el valor de data; si no, usamos initialValue
    acc[item.fieldName] = data?.[item.fieldName] || item.initialValue || "";
    return acc;
  }, {} as Record<string, any>);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues, // Usamos los valores predeterminados, basados en data o inputJson
  });
  const enError = (err) => {
    console.log(err);
  };
  return (
    <div className='mt-10 sm:w-full sm:max-w-lg w-full'>
      <Card>
        {/* <h2 margin="1rem 0" color="var(--color-text)" fontWeight="600"> */}
        {/* add tailwind classes */}
        {
          isValidString(formTitle) && <CardHeader>
          <h2 className='text-2xl font-bold text-center mt-4 text-gray-700'>
            {formTitle}
          </h2>
        </CardHeader>
        }

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, enError)}
            className='space-y-8'
          >
            <CardContent>
              {ExtraComponent &&
                extraComponentPosition === "top" &&
                ExtraComponent}
              {inputJson.map((item) => {
                switch (item.inputType) {
                  case "text":
                  case "password":
                  case "email":
                  case "number":
                  case "tel":
                  case "url":
                    return (
                      <FormCustomInput
                        inputType={item.inputType}
                        key={item.fieldName}
                        control={form.control}
                        fieldName={item.fieldName}
                        label={item.label}
                        placeholder={item.placeholder}
                        isLoading={isLoading}
                      />
                    );
                  case "select":
                    return (
                      <CustomSelect
                        inputType={item.inputType}
                        key={item.fieldName}
                        isLoading={isLoading}
                        control={form.control}
                        placeholder={item.placeholder}
                        fieldName={item.fieldName}
                        label={item.label!}
                        options={item.options!}
                      />
                    );
                  case "area":
                    return (
                      <FormCustomArea
                        inputType='text'
                        key={item.fieldName}
                        isLoading={isLoading}
                        control={form.control}
                        placeholder={item.placeholder}
                        fieldName={item.fieldName}
                        label={item.label!}
                      />
                    );
                  case "datePicker":
                   /*  return (
                      <CalendarField
                        inputType='text'
                        key={item.fieldName}
                        isLoading={isLoading}
                        control={form.control}
                        placeholder={item.placeholder}
                        fieldName={item.fieldName}
                        label={item.label!}
                      />
                    );
                  case "datePicker": */
                    return (
                      <CalendarDayPicker
                        inputType='text'
                        key={item.fieldName}
                        isLoading={isLoading}
                        control={form.control}
                        placeholder={item.placeholder}
                        fieldName={item.fieldName}
                        label={item.label!}
                      />
                    );
                  case "checkbox":
                    return (
                      <CheckboxField
                        inputType='text'
                        key={item.fieldName}
                        isLoading={isLoading}
                        control={form.control}
                        placeholder={item.placeholder}
                        fieldName={item.fieldName}
                        label={item.label!}
                        checked={false}
                      />
                    );
                  case "arrayCheckbox":
                    return (
                      <CheckboxMultiple
                        items={item.arrayCheckbox!}
                        inputType='text'
                        key={item.fieldName}
                        isLoading={isLoading}
                        control={form.control}
                        placeholder={item.placeholder}
                        fieldName={item.fieldName}
                        label={item.label!}
                      />
                    );
                }
              })}
              {ExtraComponent &&
                extraComponentPosition === "bottom" &&
                ExtraComponent}
            </CardContent>
            <CardFooter>
              <Button
                className='flex w-full justify-center rounded-full bg-primary px-3 py-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark'
                disabled={isLoading}
                type='submit'
              >
                {titleButton}
              </Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};
