import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  FormDescription,
} from '@/components/ui/form'

import { Textarea } from '@/components/ui/textarea'
import { CommonInputI } from './interfaces/form-interface'

interface TextAreaProps extends CommonInputI {
  size?: string // Nuevo prop para tamaño
  rows?: number // Controla el número de filas
  cols?: number // Controla el número de columnas
  isLoading: boolean
}

export const FormCustomArea = ({
  control,
  isLoading,
  description,
  label,
  fieldName,
  placeholder,
  size = '100%',
  rows = 4,
  cols,
}: TextAreaProps) => {
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
