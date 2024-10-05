import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

import { CommonInputI, OptionsI } from './interfaces/form-interface'
import { Select } from '@/components/ui/select'

interface SelectProps extends CommonInputI {
  options: OptionsI[]
  isLoading: boolean
}

export const CustomSelect = ({
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
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={placeholder || 'Selecciona una opción'}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.length > 0 ? (
                options.map((option: OptionsI) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.key}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value="">
                  No hay opciones disponibles
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
