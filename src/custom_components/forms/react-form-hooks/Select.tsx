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
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select'
import { Controller } from 'react-hook-form'
import { OptionsI } from './interfaces/form-interface'
import { Select } from '@/components/ui/select'

interface SelectProps {
  label: string
  fieldName: string
  [x: string]: any
  options: OptionsI[]
  control: any
  description?: string
  placeHolder?: string
}

export const CustomSelect = ({
  label,
  options,
  fieldName,
  description,
  control,
  placeHolder,
}: SelectProps) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(value)}
            defaultValue={field.value || ''} // Asegurar valor inicial
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={placeHolder || 'Selecciona una opción'}
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
