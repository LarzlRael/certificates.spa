import { z } from "zod"

export interface FormInterface {
  inputJson: InputJsonI[]
  onSubmit: (data: any) => void
  data?: any
  formTitle?: string
  isLoading: boolean
  titleButton?: string
  schema: z.ZodType<any>
}
export interface InputJsonI {
  type?: string | 'text' | 'number' | 'email' | 'area' | 'select' | 'checkbox'
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
