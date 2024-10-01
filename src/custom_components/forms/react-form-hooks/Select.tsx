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
} from '@radix-ui/react-select'
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
  console.log('options', options)
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeHolder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option: OptionsI) => (
                <SelectItem key={option.key} value={option.value}>
                  {option.key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>description</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
