import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
interface PasswordFieldProps {
  control: any
  isLoading: boolean
  label?: string
  fieldName: string
  placeholder?: string
  isPasswordField?: boolean
  inputType?: string
}

export const FormCustomField = ({
  control,
  isLoading,
  label,
  fieldName,
  placeholder,
  inputType = 'text',
  isPasswordField = false,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(!isPasswordField)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="block text-sm font-medium leading-6 text-gray-900 text-left">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                disabled={isLoading}
                className="block w-full pr-10 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-left"
                type={
                  isPasswordField
                    ? showPassword
                      ? 'text'
                      : 'password'
                    : inputType
                }
                placeholder={placeholder}
                {...field}
              />

              {isPasswordField && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={togglePasswordVisibility}
                >
                  {!showPassword ? (
                    <FaRegEyeSlash className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaRegEye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
