// Función para capitalizar la primera letra de una cadena, aceptando null o undefined
export function toCapitalize(str: string | null | undefined): string {
  if (!str) return '' // Verifica si es null, undefined o vacío
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Función para poner en mayúscula la primera letra de cada palabra, aceptando null o undefined
export function toTitleCase(str: string | null | undefined): string {
  if (!str) return '' // Verifica si es null o undefined
  return str
    .split(' ')
    .map((word) => toCapitalize(word))
    .join(' ')
}

export const removeAccents = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export function convertToSlug(sentence: string): string {
  // Función para eliminar tildes

  // Limpieza y transformación a slug 
  const cleanedSentence = removeAccents(sentence) // Elimina tildes
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Elimina caracteres especiales
    .replace(/\s+/g, '-') // Reemplaza espacios por guiones
    .replace(/--+/g, '-') // Reemplaza múltiples guiones por uno solo
    .replace(/^-+|-+$/g, '') // Elimina guiones al inicio y al final

  return cleanedSentence
}
