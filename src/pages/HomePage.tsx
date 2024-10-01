import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { GlobalFormHook } from '@/custom_components/forms/react-form-hooks/GlobalFormHook'
import { InputJsonI } from '@/custom_components/forms/react-form-hooks/interfaces/form-interface'
const formSchema = z.object({
  username: z.string().min(1, { message: 'El nombre de usuario es requerido' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  contries: z.string(),
})

const inputJson: InputJsonI[] = [
  {
    type: 'text',
    fieldName: 'username',
    placeholder: 'Nombre de usuario',
    label: 'Nombre de usuario',
    initialValue: '', // Este valor aparecerá por defecto si data no existe
  },
  {
    type: 'password',
    fieldName: 'password',
    placeholder: 'Contraseña',
    label: 'Contraseña',
    initialValue: '', // El campo de contraseña estará vacío si data no existe
  },
  {
    type: 'select',
    fieldName: 'contries',
    placeholder: 'Paises',
    label: 'Paises',
    initialValue: '', // El campo de contraseña estará vacío si data no existe
    options: [
      { key: 'Colombia', value: 'Colombia' },
      { key: 'Venezuela', value: 'Venezuela' },
      { key: 'Peru', value: 'Peru' },
    ],
  },
]

const data = {
  username: 'Carlos123', // Este valor será utilizado si se proporciona
}

export const HomePage = () => {
  return (
    <div>
      <GlobalFormHook
        isLoading={false}
        titleButton="Enviar"
        formTitle="Formulario de prueba"
        onSubmit={(data) => console.log(data)}
        schema={formSchema}
        inputJson={inputJson}
        data={data} // Aquí pasamos el objeto `data`
      />
    </div>
  )
}
