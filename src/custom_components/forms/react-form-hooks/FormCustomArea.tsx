
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  FormDescription
} from '@/components/ui/form'


import { Textarea } from '@/components/ui/textarea'
interface PasswordFieldProps {
  control: any
  isLoading: boolean
  label?: string
  fieldName: string
  placeholder?: string
  description?: string
}

export const FormCustomArea = ({
  control,
  isLoading,
  label,
  fieldName,
  description,
  placeholder,
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
