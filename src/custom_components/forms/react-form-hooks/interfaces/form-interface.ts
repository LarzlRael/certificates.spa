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
  | 'email'
  | 'area'
  | 'select'
  | 'checkbox'
  | 'tel'
  | 'url'
  | 'password'
export interface CommonInputI {
  inputType: typeInput
  fieldName: string
  control: any
  description?: string
  placeholder?: string
  label?: string
  initialValue?: string | boolean | any[]
  validate?: any
}
export interface InputJsonI {
  inputType: typeInput
  fieldName: string
  placeholder?: string
  label?: string
  initialValue?: string | boolean | any[]
  validate?: any
  options?: OptionsI[]
  reference?: string
  condition?: string
}
export interface OptionsI {
  key: string
  value: string
}
