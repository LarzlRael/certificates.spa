import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from 'react'
import { useForm, FormProvider } from "react-hook-form";
import { useWatch } from "react-hook-form";

import { z } from "zod";
import {
  FormCustomInput,
  CustomSelect,
  FormCustomArea,
  CheckboxMultiple,
  CheckboxField,
  CalendarDayPicker,
  ReactSelectFetch,
  /* FileUploadInput,
  CalendarField, */
} from "./";
import { Button } from "@/components/ui/button";
import { FormInterface, InputJsonI } from "./interfaces/form-interface";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { isValidString } from "@/utils/validation/validation";

const generateZodSchemaFromJson = (inputJson: InputJsonI[]) => {
  const schemaShape: { [key: string]: z.ZodTypeAny } = {}; // Definimos que las claves serán strings y los valores serán Zod schemas.

  inputJson.forEach((item) => {
    // Si el campo `validate` está presente, lo usamos; si no, lo hacemos opcional
    if (item.validation) {
      schemaShape[item.fieldName] = item.validation;
    } else {
      schemaShape[item.fieldName] = z.string().optional(); // Si no hay validación, opcional
    }
  });

  return z.object(schemaShape);
};

export const GlobalFormHook = ({
  inputJson,
  onSubmit,
  data,
  formTitle,
  isLoading,
  titleButton,
  /* schema, */
  ExtraComponent,
  onWatchChange,
  extraComponentPosition = "top",
}: FormInterface) => {
  const schema = generateZodSchemaFromJson(inputJson);

  const defaultValues = inputJson.reduce((acc, item) => {
    // Si existe data y contiene el campo, usamos el valor de data; si no, usamos initialValue
    acc[item.fieldName] = data?.[item.fieldName] || item.initialValue || "";
    return acc;
  }, {} as Record<string, any>);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues, // Usamos los valores predeterminados, basados en data o inputJson
  });
  const enError = (err:any) => {
    console.log(err);
  };
  const watchedValues = useWatch({ control: form.control });

  useEffect(() => {
    if (onWatchChange) {
      onWatchChange(watchedValues);
    }
  }, [watchedValues]);


  return (
    <div className='mt-10 sm:w-full sm:max-w-lg w-full'>
      <Card>
        {/* <h2 margin="1rem 0" color="var(--color-text)" fontWeight="600"> */}
        {/* add tailwind classes */}
        {isValidString(formTitle) && (
          <CardHeader>
            <h2 className='text-2xl font-bold text-center mt-4 text-gray-700'>
              {formTitle}
            </h2>
          </CardHeader>
        )}

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
                  case "text-number":
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
                  case "selectFetch":
                    return (
                      <ReactSelectFetch
                        inputType={item.inputType}
                        key={item.fieldName}
                        isLoading={isLoading}
                        control={form.control}
                        placeholder={item.placeholder}
                        fieldName={item.fieldName}
                        label={item.label!}
                        url={item.url!}
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
