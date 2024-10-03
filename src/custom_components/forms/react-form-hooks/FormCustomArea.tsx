import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  FormDescription,
} from '@/components/ui/form'

import { Textarea } from '@/components/ui/textarea'

interface PasswordFieldProps {
  control: any
  isLoading: boolean
  label?: string
  fieldName: string
  placeholder?: string
  description?: string
  size?: string // Nuevo prop para tamaño
  rows?: number // Controla el número de filas
  cols?: number // Controla el número de columnas
}

export const FormCustomArea = ({
  control,
  isLoading,
  label,
  fieldName,
  description,
  placeholder,
  size = '100%', // Valor predeterminado
  rows = 4, // Filas predeterminadas
  cols,
}: PasswordFieldProps) => {
  return (
    <FormField
      control={control}
      disabled={isLoading}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="resize-none"
              style={{ width: size }} // Establece el tamaño con el nuevo prop
              rows={rows} // Controla el número de filas
              cols={cols} // Controla el número de columnas (opcional)
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
