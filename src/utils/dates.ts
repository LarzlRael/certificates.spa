import moment from "moment";
import "moment/dist/locale/es";
moment.locale("es");
console.log(moment.locale()); // en
/**
 * Convierte una fecha en distintos formatos.
 * @param {FormatDateType} formatDate - El formato deseado para la fecha.
 * @param {Date | string} dateToConvert - La fecha a convertir.
 * @returns {string | Date | null} La fecha formateada, o null si la fecha es inválida.
 *
 * Formatos disponibles:
 * - 'LLLL': Formato completo de fecha y hora.
 * - 'utc': Devuelve la fecha en UTC.
 * - 'dddd D [de] MMMM': Día de la semana, día y mes en español.
 * - 'DD/MM': Día y mes en formato numérico.
 * - 'dayMonthVerbose': Día y mes con formato largo.
 * - 'fullDayMonth': Día de la semana completo con el día y el mes.
 */

export function convertDate(
  dateToConvert?: Date | string,
  formatDate?: string, // Cambiar el orden de los parámetros
): string | null {
  // Si no hay fecha, retorna null
  if (!dateToConvert) return null;

  // Intenta crear un objeto moment a partir de dateToConvert
  const dateMoment = moment(dateToConvert).locale("es"); // Moment acepta ISO 8601 sin especificar el formato

  // Manejo de error si dateToConvert no es una fecha válida
  if (!dateMoment.isValid()) {
    console.error("Fecha inválida:", dateToConvert);
    return null;
  }

  switch (formatDate) {
    case "LLLL": {
      const date = dateMoment.format("LL");
      const hour = dateMoment.format("LT");
      return `${date} a horas ${hour}`;
    }
    case "utc": {
      // Considerar un valor específico como null
      return dateToConvert === "0001-01-01T00:00:00"
        ? null
        : dateMoment.toISOString(); // Retorna una cadena en formato ISO
    }
    default: {
      return dateMoment.format(formatDate);
    }
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // Día con dos dígitos
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mes con dos dígitos
  const year = date.getFullYear(); // Año completo

  return `${day}/${month}/${year}`;
}

export function getDifferenceBetweenDates(startDate: Date, endDate: Date) {
  const momentDate1 = moment(startDate);
  const momentDate2 = moment(endDate);

  const daysDifference = momentDate2.diff(momentDate1, "days");
  const monthsDifference = momentDate2.diff(momentDate1, "months");

  return {
    startDate,
    endDate,
    days: Math.abs(daysDifference), // Aseguramos que siempre sea positivo
    months: Math.abs(monthsDifference), // Diferencia absoluta
  };
}

export const getTimeNow = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${
    hours > 12 ? "PM" : "AM"
  }`;
};
