import moment from 'moment'
import 'moment/locale/es'

export function convertDate(dateToConvert?: Date | string, formatDate: string) {
  // Si no hay fecha, retorna null
  if (!dateToConvert) return null

  // Intenta crear un objeto moment a partir de dateConv
  const dateMoment = moment(dateToConvert) // Moment acepta ISO 8601 sin especificar el formato

  // Manejo de error si dateConv no es una fecha válida
  if (!dateMoment.isValid()) {
    console.error('Fecha inválida:', dateToConvert)
    return null
  }

  switch (formatDate) {
    case 'LLLL': {
      const date = dateMoment.format('LL')
      const hour = dateMoment.format('LT')
      return `${date} a horas ${hour}`
    }
    case 'utc': {
      // Considerar un valor específico como null
      return dateToConvert === '0001-01-01T00:00:00'
        ? null
        : new Date(dateToConvert)
    }
    default: {
      return dateMoment.format(formatDate)
    }
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0') // Día con dos dígitos
  const month = String(date.getMonth() + 1).padStart(2, '0') // Mes con dos dígitos
  const year = date.getFullYear() // Año completo

  return `${day}/${month}/${year}`
}

export function getDifferenceBetweenDates(startDate: Date, endDate: Date) {
  const momentDate1 = moment(startDate)
  const momentDate2 = moment(endDate)

  const daysDifference = momentDate2.diff(momentDate1, 'days')
  const monthsDifference = momentDate2.diff(momentDate1, 'months')

  return {
    startDate,
    endDate,
    days: Math.abs(daysDifference), // Aseguramos que siempre sea positivo
    months: Math.abs(monthsDifference), // Diferencia absoluta
  }
}
