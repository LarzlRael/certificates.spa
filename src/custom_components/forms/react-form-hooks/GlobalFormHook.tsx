import { zodResolver } from '@hookform/resolvers/zod'

import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { FormCustomInput } from './FormCustomInput'
import { Button } from '@/components/ui/button'
import { FormInterface } from './interfaces/form-interface'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { CustomSelect } from './Select'

export const GlobalFormHook = ({
  inputJson,
  onSubmit,
  data,
  formTitle,
  isLoading,
  titleButton,
  schema,
}: FormInterface) => {
  const defaultValues = inputJson.reduce((acc, item) => {
    // Si existe data y contiene el campo, usamos el valor de data; si no, usamos initialValue
    acc[item.fieldName] = data?.[item.fieldName] || item.initialValue || ''
    return acc
  }, {} as Record<string, any>)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues, // Usamos los valores predeterminados, basados en data o inputJson
  })

  return (
    <div className="mt-10 sm:w-full sm:max-w-lg w-full">
      <Card>
        {/* <h2 margin="1rem 0" color="var(--color-text)" fontWeight="600"> */}
        {/* add tailwind classes */}
        <CardHeader>
          <h2 className="">{formTitle}</h2>
        </CardHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent>
              {inputJson.map((item) => {
                switch (item.type) {
                  case 'text':
                  case 'password':
                  case 'email':
                  case 'number':
                  case 'tel':
                  case 'url':
                    return (
                      <FormCustomInput
                        key={item.fieldName}
                        isLoading={isLoading}
                        isPasswordField={item.type === 'password'}
                        control={form.control}
                        fieldName={item.fieldName}
                        label={item.label}
                        placeholder={item.placeholder}
                      />
                    )
                  case 'select':
                    return (
                      <CustomSelect
                        key={item.fieldName}
                        isLoading={isLoading}
                        control={form.control}
                        placeHolder={item.placeholder}
                        fieldName={item.fieldName}
                        label={item.label!}
                        options={item.options!}
                      />
                    )
                }
              })}
            </CardContent>
            <CardFooter>
              <Button
                className="flex w-full justify-center rounded-full bg-primary px-3 py-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
                disabled={isLoading}
                type="submit"
              >
                {titleButton}
              </Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  )
}
