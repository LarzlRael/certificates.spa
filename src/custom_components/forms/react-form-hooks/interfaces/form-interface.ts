import { z } from 'zod'

export interface FormInterface {
  inputJson: InputJsonI[]
  onSubmit: (data: any) => void
  data?: any
  formTitle?: string
  isLoading: boolean
  ExtraComponent?: undefined | React.ReactNode
  titleButton?: string
  extraComponentPosition?: 'top' | 'bottom'
  schema: z.ZodType<any>
}
export type typeInput =
  | 'text'
  | 'number'
  | 'text-number'
  | 'email'
  | 'area'
  | 'select'
  | 'checkbox'
  | 'arrayCheckbox'
  | 'tel'
  | 'url'
  | 'password'
  | 'datePicker'


export interface CheckboxInterface {
  label: string
  id: number
  checked?: boolean
}

export interface CommonInputI {
  inputType: typeInput
  fieldName: string
  control: any
  description?: string
  placeholder?: string
  label?: string
  initialValue?: string | boolean | any[]
  validate?: any
  arrayCheckbox?: CheckboxInterface[]
  
}
export interface InputJsonI {
  inputType: typeInput
  fieldName: string
  placeholder?: string
  label?: string
  initialValue?: string | boolean | any[]
  validate?: any
  options?: OptionsI[]
  arrayCheckbox?: CheckboxInterface[]
  reference?: string
  condition?: string
}
export interface OptionsI {
  key: string
  value: string
}
