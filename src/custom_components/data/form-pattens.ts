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
    inputType: 'text',
    fieldName: 'dni',
    placeholder: 'Carnet de identidad',
    label: 'Carnet de identidad',
    initialValue: '',
  },
  {
    inputType: 'datePicker',
    fieldName: 'dateBirth',
    placeholder: 'Fecha de nacimiento',
    label: 'Fecha de nacimiento',
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

export const addNewUser: InputJsonI[] = [
  {
    inputType: 'text',
    fieldName: 'firstName',
    placeholder: 'Ingrese nombre de usuario',
    label: 'Nombre de usuario',
    initialValue: '',
  },
  {
    inputType: 'text',
    fieldName: 'lastName',
    placeholder: 'Apellido de usuario',
    label: 'Apellido de usuario',
    initialValue: '',
  },
  {
    inputType: 'text',
    fieldName: 'phone',
    placeholder: 'Numero de celular',
    label: 'Celular',
    initialValue: '',
  },
  {
    inputType: 'text',
    fieldName: 'dni',
    placeholder: 'Carnet de identidad',
    label: 'Carnet de identidad',
    initialValue: '',
  },
  {
    inputType: 'datePicker',
    fieldName: 'dateBirth',
    placeholder: 'Fecha de nacimiento',
    label: 'Fecha de nacimiento',
    initialValue: '',
  },
]
