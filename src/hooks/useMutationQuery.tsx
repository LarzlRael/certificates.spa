import { useMutation, UseMutationResult } from '@tanstack/react-query'

// Definimos los tipos para la función de mutación
type MutationFn<T, V> = (variables: V) => Promise<T>

// Interfaz para las propiedades del hook
interface MutationQueryProps<T, V> {
  mutationFn: MutationFn<T, V>
  onSuccess?: (data?: T) => void
  onError?: (error: any) => void
}

export const useMutationQuery = <T, V>({
  mutationFn,
  onSuccess,
  onError,
}: MutationQueryProps<T, V>): UseMutationResult<T, any, V> => {
  const mutation = useMutation<T, any, V>({
    mutationFn,
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data) // Llama a la función de éxito pasada como argumento
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error) // Llama a la función de error pasada como argumento
      }
    },
  })

  return mutation
}
