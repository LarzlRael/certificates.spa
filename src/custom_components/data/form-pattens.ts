import { InputJsonI } from "@/custom_components/forms/react-form-hooks/interfaces/form-interface";
import { z } from "zod";

// Array `updateUserInformationForm` con el campo `validation` reemplazado
export const updateUserInformationForm: InputJsonI[] = [
  {
    inputType: "text",
    fieldName: "firstName",
    placeholder: "Nombre de usuario",
    label: "Nombre",
    initialValue: "",
    validation: z.string().min(3).max(50).optional(), // Validación para nombre
  },
  {
    inputType: "text",
    fieldName: "lastName",
    placeholder: "Apellido de usuario",
    label: "Apellido",
    initialValue: "",
    validation: z.string().min(3).max(50).optional(), // Validación para apellido
  },
  {
    inputType: "text",
    fieldName: "address",
    placeholder: "Dirección",
    label: "Ubicación de usuario",
    initialValue: "",
    validation: z.string().max(100).optional(), // Validación para dirección
  },
  {
    inputType: "text",
    fieldName: "shippingAddress",
    placeholder: "Dirección de envío",
    label: "Dirección de envío de usuario",
    initialValue: "",
    validation: z.string().max(100).optional(), // Validación para dirección de envío
  },
  {
    inputType: "text",
    fieldName: "dni",
    placeholder: "Carnet de identidad",
    label: "Carnet de identidad",
    initialValue: "",
    validation: z.string().max(15).optional(), // Validación para DNI
  },
  {
    inputType: "datePicker",
    fieldName: "dateBirth",
    placeholder: "Fecha de nacimiento",
    label: "Fecha de nacimiento",
    initialValue: "",
    validation: z.string().optional(), // Validación para fecha de nacimiento, puede ser más estricta según el formato deseado
  },
  {
    inputType: "number",
    fieldName: "phone",
    placeholder: "Teléfono del usuario",
    label: "Teléfono",
    initialValue: "",
    validation: z.string().max(8).optional(), // Validación para teléfono
  },
];

export const addOrEditProfessor: InputJsonI[] = [
  {
    inputType: "text",
    fieldName: "fullName",
    placeholder: "Nombre de profesor",
    label: "Nombre completo",
    validation: z
      .string()
      .min(8, { message: "Debe tener al menos 8 caracteres." })
      .optional(), // Validación para nombre completo
  },
  {
    inputType: "text",
    fieldName: "phone",
    placeholder: "Teléfono",
    label: "Teléfono",
    initialValue: "",
    validation: z
      .string()
      .min(8, { message: "Debe tener al menos 8 caracteres." })
      .optional(), // Validación para teléfono
  },
  {
    inputType: "text",
    fieldName: "academicRecord",
    placeholder: "Registro académico",
    label: "Registro académico",
    initialValue: "",
    validation: z.string().optional(), // Si no se especifica una validación, puede ser opcional
  },
  {
    inputType: "text",
    fieldName: "professionalTitle",
    placeholder: "Titulo profesional",
    label: "Titulo profesional",
    initialValue: "",
    validation: z.string().optional(), // Si no se especifica una validación, puede ser opcional
  },
  {
    inputType: "area",
    fieldName: "description",
    placeholder: "Descripción",
    label: "Descripción",
    initialValue: "",
    validation: z
      .string()
      .min(3, { message: "La descripción debe tener al menos 3 caracteres." })
      .optional(), // Validación para descripción
  },
];

export const addNewUser: InputJsonI[] = [
  {
    inputType: "text",
    fieldName: "firstName",
    placeholder: "Ingrese nombre de usuario",
    label: "Nombre de usuario",
    initialValue: "",
    validation: z
      .string()
      .min(1, { message: "El nombre no puede estar vacío." })
      .max(50, {
        message: "El nombre no puede exceder los 50 caracteres.",
      }),
  },
  {
    inputType: "text",
    fieldName: "lastName",
    placeholder: "Apellido de usuario",
    label: "Apellido de usuario",
    initialValue: "",
    validation: z
      .string()
      .min(1, { message: "El apellido no puede estar vacío." })
      .max(50, {
        message: "El apellido no puede exceder los 50 caracteres.",
      }),
  },
  {
    inputType: "text",
    fieldName: "phone",
    placeholder: "Numero de celular",
    label: "Celular",
    initialValue: "",
    validation: z
      .string()
      .min(8, {
        message: "El teléfono debe tener al menos 8 dígitos.",
      })
      .regex(/^[0-9]+$/, {
        message: "El teléfono solo puede contener números.",
      }),
  },
  {
    inputType: "text",
    fieldName: "dni",
    placeholder: "Carnet de identidad",
    label: "Carnet de identidad",
    initialValue: "",
    validation: z
      .string()
      .min(6, {
        message: "El DNI debe tener al menos 8 caracteres.",
      })
      .max(12, {
        message: "El DNI no puede exceder los 12 caracteres.",
      })
      .regex(/^[0-9]+$/, {
        message: "El DNI solo puede contener números.",
      }),
  },
  {
    inputType: "datePicker",
    fieldName: "dateBirth",
    placeholder: "Fecha de nacimiento",
    label: "Fecha de nacimiento",
    initialValue: "",
    validation: z.date(),
  },
];

export const sendNotificationForm: InputJsonI[] = [
  {
    inputType: "text",
    fieldName: "title",
    placeholder: "Título de la notificación",
    label: "Título de la notificación",
    validation: z
      .string()
      .min(3, { message: "Debe tener al menos 8 caracteres." }),
  },
  {
    inputType: "area",
    fieldName: "body",
    placeholder: "Escribe el mensaje de la notificación aquí...",
    label: "Contenido de la notificación",
    initialValue: "",
    validation: z
      .string()
      .min(5, { message: "Debe tener al menos 5 caracteres." })
      .optional(),
  },
  {
    inputType: "selectFetch",
    fieldName: "idCourse",
    placeholder: "Seleccionar curso",
    label: "Curso",
    initialValue: "",
    validation: z.number(), // Si no se especifica una validación, puede ser opcional
    url: "course/find-all-courses-names",
  },
  /* 
  {
    inputType: "text",
    fieldName: "professionalTitle",
    placeholder: "Titulo profesional",
    label: "Titulo profesional",
    initialValue: "",
    validation: z.string().optional(), // Si no se especifica una validación, puede ser opcional
  }, */
];
