// Función para capitalizar la primera letra de una cadena, aceptando null o undefined
export function toCapitalize(str: string | null | undefined): string {
  if (!str) return ''; // Verifica si es null, undefined o vacío
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Función para poner en mayúscula la primera letra de cada palabra, aceptando null o undefined
export function toTitleCase(str: string | null | undefined): string {
  if (!str) return ''; // Verifica si es null o undefined
  return str
    .split(' ')
    .map((word) => toCapitalize(word))
    .join(' ');
}
