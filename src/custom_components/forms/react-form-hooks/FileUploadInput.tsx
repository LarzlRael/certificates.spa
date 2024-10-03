import React from 'react'
import { FormLabel } from '@/components/ui/form'
import { Controller } from 'react-hook-form'
interface FileUploadInputProps {
  control: any
  isLoading: boolean
  label?: string
  fieldName: string
  placeholder?: string
  description?: string
  showPreview?: boolean
}
export const FileUploadInput = ({
  control,
  label,
  placeholder,
  description,
  fieldName,
  showPreview = true,
}: FileUploadInputProps) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col">
          <FormLabel className="block text-sm font-medium leading-6 text-gray-900 text-left">
            {label}
          </FormLabel>
          <input
            type="file"
            placeholder={placeholder}
            accept="image/*" // Solo acepta imágenes
            onChange={(e) => {
              const file = e.target.files[0] // Tomar solo el primer archivo
              field.onChange(file) // Actualiza el estado del formulario con el archivo seleccionado
            }}
            className="border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {showPreview && field.value && (
            <div className="relative w-full max-w-sm">
              <img
                src={URL.createObjectURL(field.value)} // Crea una URL temporal para mostrar la imagen
                alt={field.value.name}
                className="w-full h-auto rounded-lg shadow-md"
              />
              <p className="mt-2 text-center text-gray-500">
                {field.value.name}
              </p>
            </div>
          )}
        </div>
      )}
    />
  )
}
