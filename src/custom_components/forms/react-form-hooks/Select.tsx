import React from 'react'
import { FormLabel } from '@/components/ui/form'
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
}

export const CustomSelect = ({
  label,
  options,
  fieldName,
  control,
}: SelectProps) => {
  return (
    <div>
      <FormLabel className="block text-sm font-medium leading-6 text-gray-900 text-left">
        {label}
      </FormLabel>
      <Controller
        name={fieldName} // Nombre del campo en el schema del form
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder={'Modalidad'} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Modalidad</SelectLabel>
                {/*  <SelectItem value="VIRTUAL">Virtual</SelectItem> */}
                {options.map((option: OptionsI) => (
                  <SelectItem key={option.key} value={option.value}>
                    {option.key}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  )
}
