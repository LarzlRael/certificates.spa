import * as Yup from 'yup'
import { InputJsonI } from '@/custom_components/forms/react-form-hooks/interfaces/form-interface'
export const updateUserInformationForm: InputJsonI[] = [
  {
    inputType: 'text',
    fieldName: 'firstName',
    placeholder: 'Nombre de usuario',
    label: 'Nombre',
    initialValue: '',
  },
  {
    inputType: 'text',
    fieldName: 'lastName',
    placeholder: 'Apellido de usuario',
    label: 'Apellido',
    initialValue: '',
  },

  {
    inputType: 'text',
    fieldName: 'address',
    placeholder: 'Direccion',
    label: 'Ubicación de usuario',
    initialValue: '',
  },

  {
    fieldName: 'shippingAddress',
    inputType: 'text',
    placeholder: 'Direccion de envio',
    label: 'Direccion de envio de usuario',
    initialValue: '',
  },
  {
    fieldName: 'phone',
    inputType: 'number',
    placeholder: 'Teléfono del usuario',
    label: 'Telefono',
    initialValue: '',
  },
]

/* 
fullName
expertise
phone
academicRecord
description*/
export const addOrEditProfessor: InputJsonI[] = [
  {
    inputType: 'text',
    fieldName: 'fullName',
    placeholder: 'Nombre de profesor',
    label: 'profesor',
  },
  {
    inputType: 'text',
    fieldName: 'phone',
    placeholder: 'Telefono',
    label: 'Telefono',
    initialValue: '',
  },

  {
    inputType: 'text',
    fieldName: 'academicRecord',
    placeholder: 'Record academico',
    label: 'Record academico',
    initialValue: '',
  },

  {
    inputType: 'area',
    fieldName: 'description',
    placeholder: 'Description',
    label: 'Descripcion',
    initialValue: '',
  },
]
