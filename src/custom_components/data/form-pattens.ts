import * as Yup from 'yup'
import { InputJsonI } from '@/custom_components/forms/react-form-hooks/interfaces/form-interface'
export const updateUserInformationForm: InputJsonI[] = [
  {
    type: 'text',
    fieldName: 'firstName',
    placeholder: 'Nombre de usuario',
    label: 'Nombre',
    initialValue: '',
  },
  {
    type: 'text',
    fieldName: 'lastName',
    placeholder: 'Apellido de usuario',
    label: 'Apellido',
    initialValue: '',
  },

  {
    type: 'text',
    fieldName: 'address',
    placeholder: 'Direccion',
    label: 'Ubicación de usuario',
    initialValue: '',
  },

  {
    fieldName: 'shippingAddress',
    type: 'text',
    placeholder: 'Direccion de envio',
    label: 'Direccion de envio de usuario',
    initialValue: '',
  },
  {
    fieldName: 'phone',
    type: 'number',
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
    type: 'text',
    fieldName: 'fullName',
    placeholder: 'Nombre de profesor',
    label: 'profesor',
  },
  {
    type: 'text',
    fieldName: 'phone',
    placeholder: 'Telefono',
    label: 'Telefono',
    initialValue: '',
  },

  {
    type: 'text',
    fieldName: 'academicRecord',
    placeholder: 'academicRecord',
    label: 'Record academico',
    initialValue: '',
  },

  {
    type: 'area',
    fieldName: 'description',
    placeholder: 'Description',
    label: 'Descripcion',
    initialValue: '',
  },
]
